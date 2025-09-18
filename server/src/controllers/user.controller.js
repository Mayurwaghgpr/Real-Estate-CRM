// controllers/user.controller.js
const User = require("../models/user.model");

exports.getAllUsers = async (req, res, next) => {
  try {
    const result = await User.find();
    res.status(200).json({ message: "Successfully fetched", result });
  } catch (error) {
    console.error("Error occurred while getting users:", error);
    error.statusCode = 500;
    next(error);
  }
};

exports.getAllAgent = async (req, res, next) => {
  try {
    const agents = await User.find({ role: "agent" }).select("-password"); // exclude password if present
    res.status(200).json({
      success: true,
      message: "Agents fetched successfully",
      data: agents,
    });
  } catch (error) {
    console.error("Error occurred while fetching agents:", error);
    next({ statusCode: 500, message: "Internal Server Error" });
  }
};

exports.getAgent = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = {
      role: "agent",
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    const agents = await User.find(query)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Agents fetched successfully",
      data: agents,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching agents:", error);
    next({ statusCode: 500, message: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({
      success: true,
      message: "User info udated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    next({ statusCode: 500, message: "Internal Server Error" });
  }
};
