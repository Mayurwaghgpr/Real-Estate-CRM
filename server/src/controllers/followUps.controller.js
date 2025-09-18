const FollowUp = require("../models/followUps.model");
const moment = require("moment");

//Create FollowUp
exports.createFollowUp = async (req, res, next) => {
  try {
    const {
      leadId,
      title,
      followupsDate,
      description,
      priority,
      status,
      type,
      assignedTo,
    } = req.body;

    const filter =
      req.user.role === "admin" ? { assignedTo } : { assignedTo: req.user.id };

    const followUp = await FollowUp.create({
      ...filter,
      lead: leadId,
      createdBy: req.user.id,
      followupsDate,
      description,
      title,
      type,
      status,
      priority,
    });
    res.status(201).json(followUp);
  } catch (error) {
    next(error);
    res.status(500).json({ error: error.message });
  }
};

// Get All FollowUps
exports.getAllFollowUps = async (req, res) => {
  try {
    const followups = await FollowUp.find()
      .populate("lead")
      .populate("createdBy", "name email");

    res.status(200).json({ success: true, data: followups });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get FollowUps with Pagination & Filters
exports.getFollowUpsByPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { agent, status } = req.query;
    // Build filter conditions dynamically
    let filter = {};
    if (req.user.role !== "admin") {
      filter.assignedTo == req.user.id;
    }

    // Filter by Agent (assuming assignedTo field is in FollowUp schema)
    if (agent) {
      filter.assignedTo = agent; // expects agent id
    }

    // Filter by Status
    if (status && status !== "all") {
      if (status === "overdue") {
        filter = {
          ...filter,
          status: "pending",
          followupsDate: { $lt: new Date() },
        };
      } else {
        filter = {
          ...filter,
          status: status,
        };
      }
    }

    // Count total
    const total = await FollowUp.countDocuments(filter);

    // Fetch with pagination
    const followups = await FollowUp.find(filter)
      .populate("lead")
      .populate("createdBy")
      .populate("assignedTo")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      followups,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get My Followups
exports.getMyFollowUps = async (req, res) => {
  try {
    const followUps = await FollowUp.find({ createdBy: req.user.id })
      .populate("lead")
      .sort({ followUpDate: 1 });
    res.json(followUps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get  Followups by Lead
exports.getFollowUpsByLeadId = async (req, res) => {
  try {
    const followUps = await FollowUp.find({ lead: req.params.id })
      .populate("lead")
      .sort({ followUpDate: 1 });
    res.status(200).json({ followUps });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get the next follow-up for a specific lead
exports.getNextFollowUp = async (req, res, next) => {
  try {
    const { leadId } = req.params;

    if (!leadId) {
      return res.status(400).json({ message: "Lead ID is required" });
    }

    const nextFollowUp = await FollowUp.findOne({
      leads: leadId,
      followupDate: { $gte: new Date() }, // upcoming or today
      status: "pending",
    })
      .sort({ followupDate: 1 }) // earliest date first
      .populate("createdBy") // show creator details
      .populate("leads"); // show lead details

    if (!nextFollowUp) {
      return res.status(404).json({ message: "No upcoming follow-up found" });
    }

    res.status(200).json(nextFollowUp);
  } catch (error) {
    console.error("Error fetching next follow-up:", error);
    next(error);
  }
};

// Get the next follow-up for a specific lead
exports.getUpcommingFollowUps = async (req, res, next) => {
  try {
    const { role, id } = req.user;
    const filter = role === "admin" ? {} : { assignedTo: id };
    const nextFollowUp = await FollowUp.find({
      ...filter,
      followupsDate: { $gte: new Date() },
      status: "pending",
    })
      .sort({ followupsDate: 1 }) // earliest date first
      .populate("createdBy") // show creator details
      .populate("lead"); // show lead details

    res.status(200).json(nextFollowUp);
  } catch (error) {
    console.error("Error fetching next follow-up:", error);
    next(error);
  }
};

// Get Today's Followups
exports.getTodaysFollowups = async (req, res, next) => {
  try {
    const { role, id } = req.user;
    const filter = role === "admin" ? {} : { assignedTo: id };

    const todayStart = moment().startOf("day").toDate();
    const todayEnd = moment().endOf("day").toDate();

    const followups = await FollowUp.find({
      ...filter,
      followupDate: {
        $gte: todayStart,
        $lte: todayEnd,
      },
    })
      .populate("leads")
      .populate("createdBy");

    res.status(200).json({ success: true, followups });
  } catch (error) {
    console.error("Error fetching today's followups:", error);
    next(error);
  }
};

// Get One FollowUp
exports.getFollowUpById = async (req, res, next) => {
  try {
    const followup = await FollowUp.findById(req.params.id);

    if (
      !followup ||
      followup.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(404).json({ message: "Follow-up not found" });
    }

    res.status(200).json({ success: true, data: followup });
  } catch (error) {
    next(error);
  }
};

exports.getOverdueFollowUps = async (req, res) => {
  try {
    const query = {
      followUpDate: { $lt: new Date() },
      status: "pending",
    };
    if (req.user.role === "agent") query.createdBy = req.user.id;

    const followUps = await FollowUp.find(query).populate("lead");
    res.json(followUps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFollowupsAnalytics = async (req, res, next) => {
  try {
    const { role, id } = req.user;
    const filter = role === "admin" ? {} : { assignedTo: id };

    const total = await FollowUp.countDocuments(filter);

    const completed = await FollowUp.countDocuments({
      ...filter,
      status: "completed",
    });

    const pending = await FollowUp.countDocuments({
      ...filter,
      status: "pending",
    });

    const overdue = await FollowUp.countDocuments({
      ...filter,
      status: "pending",
      dueDate: { $lt: new Date() },
    });

    // Time-based trend (last 7 days)
    const last7Days = await FollowUp.aggregate([
      { $match: filter }, // apply filter here too
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      total,
      completed,
      pending,
      overdue,
      last7Days,
    });
  } catch (error) {
    next(error);
  }
};

// Update FollowUp
exports.updateFollowUp = async (req, res, next) => {
  try {
    const followup = await FollowUp.findById(req.params.id);

    if (
      !followup ||
      followup.createdBy.toString() !== req.user._id.toString()
    ) {
      return res
        .status(404)
        .json({ message: "Follow-up not found or unauthorized" });
    }

    const updatedFollowUp = await FollowUp.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updatedFollowUp });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Delete FollowUp
exports.deleteFollowUp = async (req, res, next) => {
  try {
    const followup = await FollowUp.findById(req.params.id);

    if (
      !followup ||
      (req.user.role !== "admin" &&
        followup.assignedTo.toString() !== req.user.id.toString())
    ) {
      return res
        .status(404)
        .json({ message: "Follow-up not found or unauthorized" });
    }

    await FollowUp.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ success: true, message: "Follow-up deleted successfully" });
  } catch (error) {
    next(error);
  }
};
