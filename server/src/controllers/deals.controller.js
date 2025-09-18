const { Deal, DEAL_STAGES } = require("../models/deals.model");
const Lead = require("../models/leads.model");
const Property = require("../models/properties.model");

exports.createDeal = async (req, res, next) => {
  const {
    leadId,
    propertyId,
    stage,
    expectedValue,
    expectedCloseDate,
    notes,
    assignedTo,
  } = req.body;

  try {
    const deal = new Deal({
      assignedTo: assignedTo || req.user.id,
      lead: leadId,
      property: propertyId,
      stage,
      expectedValue,
      expectedCloseDate,
      notes,
    });
    await deal.save();

    const property = await Property.findByIdAndUpdate(
      propertyId,
      { status: "under-offer" },
      { new: true }
    );
    res.status(201).json({ deal, property });
  } catch (error) {
    next(error);
  }
};

exports.getAllDeals = async (req, res, next) => {
  try {
    const { stage, assignedTo } = req.query;
    const q = {};
    if (stage) q.stage = stage;
    if (assignedTo) q.assignedTo = assignedTo;

    const deals = await Deal.find(q)
      .populate("lead", "name mobileNumber email")
      .populate("property", "title price location status")
      .populate("assignedTo", "name email")
      .sort({ updatedAt: -1 });

    res.json(deals);
  } catch (e) {
    next(error);
  }
};

exports.getBoard = async (req, res, next) => {
  try {
    const user = req.user; // assuming you attach user info from JWT middleware
    const {
      stage,
      assignedTo,
      propertyId,
      startDate,
      endDate,
      minValue,
      maxValue,
    } = req.query;

    // Base query
    let query = {};

    // Role-based filter
    if (user.role !== "admin") {
      query.assignedTo = user.id; // non-admins only see their deals
    }

    // Stage filter
    if (stage) query.stage = stage;

    // Assigned-to filter
    if (assignedTo) query.assignedTo = assignedTo;

    // Property filter
    if (propertyId) query.property = propertyId;

    // Expected value filter (range)
    if (minValue || maxValue) {
      query.expectedValue = {};
      if (minValue) query.expectedValue.$gte = Number(minValue);
      if (maxValue) query.expectedValue.$lte = Number(maxValue);
    }

    // Date range filter (expectedCloseDate)
    if (startDate || endDate) {
      query.expectedCloseDate = {};
      if (startDate) query.expectedCloseDate.$gte = new Date(startDate);
      if (endDate) query.expectedCloseDate.$lte = new Date(endDate);
    }

    const deals = await Deal.find(query)
      .populate("lead", "name")
      .populate("property", "title")
      .populate("assignedTo", "name")
      .lean();

    // Initialize board structure
    const board = DEAL_STAGES.reduce((acc, s) => ({ ...acc, [s]: [] }), {});

    // Organize deals into stages
    for (const d of deals) {
      board[d.stage].push({
        id: String(d._id),
        title: `${d.lead?.name ?? "Lead"} — ${d.property?.title ?? "Property"}`,
        expectedValue: d.expectedValue ?? null,
        finalValue: d.finalValue ?? null,
        lead: d.lead,
        property: d.property,
        assignedTo: d.assignedTo,
        expectedCloseDate: d.expectedCloseDate,
        actualCloseDate: d.actualCloseDate,
        notes: d.notes,
        stage: d.stage,
      });
    }

    res.json({ stages: DEAL_STAGES, columns: board });
  } catch (error) {
    console.log("Error fetching board:", error);
    next(error);
  }
};
//Get deal by id
exports.getDealById = async (req, res) => {
  try {
    const { id } = req.params;

    const deal = await Deal.findById(id)
      .populate("lead") // populate lead basic info
      .populate("property") // populate property basic info
      .populate("assignedTo") // agent info
      .populate("history.reopenedBy");

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.status(200).json(deal);
  } catch (error) {
    console.error("Error fetching deal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update stage (drag & drop)
exports.updateStage = async (req, res, next) => {
  try {
    const { stage } = req.body;
    if (!DEAL_STAGES.includes(stage)) {
      return res.status(400).json({ error: "Invalid stage" });
    }

    let deal = await Deal.findById(req.params.id)
      .populate("property")
      .populate("lead");
    if (!deal) return res.status(404).json({ error: "Deal not found" });

    // Update deal stage
    deal.stage = stage;
    if (stage === "closed_won" || stage === "closed_lost") {
      deal.actualCloseDate = new Date();
    }
    await deal.save();

    const property = deal.property;
    const lead = deal.lead;

    if (stage === "closed_won") {
      property.status = property.listingType === "sale" ? "sold" : "rented";
      if (lead) lead.status = "converted";
    }

    if (stage === "closed_lost") {
      // Only mark available if no other active deals
      const activeDeals = await Deal.countDocuments({
        property: property._id,
        stage: { $nin: ["closed_won", "closed_lost"] },
      });

      if (activeDeals === 0) {
        property.status = "available";
      }

      if (lead) lead.status = "lost";
    }

    await property.save();
    if (lead) await lead.save();

    res.status(200).json(deal);
  } catch (error) {
    next(error);
  }
};

// Update general
exports.updateDeal = async (req, res, next) => {
  try {
    const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!deal) return res.status(404).json({ error: "Deal not found" });
    res.json(deal);
  } catch (error) {
    console.error("Error creating deal:", error);
    next(error); // consistency
  }
};

exports.reopenDeal = async (req, res) => {
  try {
    const {
      newStage = "qualification",
      notes,
      expectedValue,
      expectedCloseDate,
    } = req.body;
    const userId = req.user.id;

    const deal = await Deal.findById(req.params.dealId)
      .populate("lead")
      .populate("property");

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    if (!["closed_won", "closed_lost"].includes(deal.stage)) {
      return res
        .status(400)
        .json({ message: "Only closed deals can be reopened" });
    }

    // Update Notes / History

    if (!deal.history) deal.history = [];
    deal.history.push({
      action: "REOPENED",
      previousStage: deal.stage,
      reopenedBy: userId,
      reopenedAt: new Date(),
      notes,
    });

    // Update Deal Stage

    deal.stage = newStage;
    deal.actualCloseDate = null;
    if (expectedCloseDate) deal.expectedCloseDate = expectedCloseDate;
    if (expectedValue) deal.expectedValue = expectedValue;
    deal.notes =
      (deal.notes || "") + `\nReopened by ${userId} on ${new Date()}`;

    await deal.save();

    // Reset Property Status
    if (deal.property) {
      deal.property.status = "available";
      await deal.property.save();
    }

    // Reset Lead Status
    if (deal.lead) {
      deal.lead.status = "qualified";
      await deal.lead.save();
    }

    return res.json({ message: "Deal reopened successfully", deal });
  } catch (err) {
    console.error("Error reopening deal:", err);
    res.status(500).json({ message: "Server error" });
  }
};
