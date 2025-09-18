const FollowUps = require("../models/followUps.model");
const Lead = require("../models/leads.model");
const XLSX = require("xlsx");
// const fs = require("fs");
// const path = require("path");

exports.createLead = async (req, res, next) => {
  try {
    const lead = new Lead(req.body);

    await lead.save();
    res.status(201).json(lead);
  } catch (err) {
    console.log("Error occur while adding leads", err);
    next(err);
  }
};

exports.importLeadsExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Parse buffer with xlsx
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0]; // Take first sheet
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const leads = XLSX.utils.sheet_to_json(sheet);

    //  Insert into DB (Mongoose)
    await Lead.insertMany(leads);

    return res.status(201).json({
      message: "File processed successfully",
      total: leads.length,
      dataPreview: leads.slice(0, 5), // send first 5 rows as preview
    });
  } catch (error) {
    console.error("Import Error:", error);
    return res.status(500).json({ message: "Failed to process file" });
  }
};
exports.exportLeadsExcel = async (req, res) => {
  try {
    const leads = await Lead.find()
      .populate("assignedTo") // populate assigned user
      .populate("interestedIn") // populate interest ref
      .lean();

    if (!leads.length) {
      return res.status(404).json({ message: "No leads found" });
    }

    // Format leads for Excel
    const formattedLeads = leads.map((lead) => ({
      id: lead._id.toString(),
      voucherId: lead.voucherId,
      name: lead.name,
      email: lead.email,
      mobileNumber: lead.mobileNumber,
      assignedTo: lead.assignedTo
        ? `${lead.assignedTo.name} (${lead.assignedTo.email})`
        : "Unassigned",
      interestedIn: lead.interestedIn
        ? `${lead.interestedIn.title} (${lead.interestedIn.category})`
        : "Not Interested",
      status: lead.status,
      createdAt: lead.createdAt
        ? new Date(lead.createdAt).toLocaleString()
        : "",
      updatedAt: lead.updatedAt
        ? new Date(lead.updatedAt).toLocaleString()
        : "",
    }));

    // Convert JSON → Worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedLeads);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    // Save workbook to buffer
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader("Content-Disposition", "attachment; filename=leads.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error exporting leads to Excel" });
  }
};

exports.getAllLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find().populate("assignedTo interestedIn");
    res.json(leads);
  } catch (err) {
    next(err);
  }
};

exports.getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id).populate(
      "assignedTo interestedIn"
    );

    res.json(lead);
  } catch (err) {
    next(err);
  }
};

exports.getPagintedDisposedLeads = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobileNumber: { $regex: search, $options: "i" } },
        { source: { $regex: search, $options: "i" } },
      ],
      isDispose: true,
    };
    if (req.user.role == "agent") {
      query.assignedTo = req.user.id;
    }

    const leads = await Lead.find(query)
      .populate("interestedIn")
      .populate("assignedTo") // populate user fields
      // .populate("companyId", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Lead.countDocuments(query);

    res.status(200).json({
      success: true,
      data: leads,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Error in getLeads:", err);
    next(err);
  }
};
exports.getPagintedLeads = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobileNumber: { $regex: search, $options: "i" } },
        { source: { $regex: search, $options: "i" } },
      ],
      isDispose: false,
    };

    const leads = await Lead.find(query)
      .populate("interestedIn")
      .populate("assignedTo") // populate user fields
      // .populate("companyId", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Lead.countDocuments(query);

    res.status(200).json({
      success: true,
      data: leads,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Error in getLeads:", err);
    next(err);
  }
};

exports.updateLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (req.body.assignedTo) {
      const leadFollowups = FollowUps.find({ lead: lead._id });
      leadFollowups.map((followUp) => ({
        ...followUp,
        assignedTo: req.body.assignedTo,
      }));
    }
    res
      .status(201)
      .json({ message: "successfuly update", success: true, lead });
  } catch (err) {
    console.error("Error in updating leads:", err);
    next(err);
  }
};

exports.updateLeadStatus = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(lead);
  } catch (err) {
    console.error("Error in updating leads:", err);
    next(err);
  }
};

exports.toggelIsDisposeLead = async (req, res, next) => {
  try {
    const result = await Lead.findByIdAndUpdate(req.params.id, {
      isDispose: !req.body.isDispose,
    });
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Error in dipose leads:", err);
    next(err);
  }
};
