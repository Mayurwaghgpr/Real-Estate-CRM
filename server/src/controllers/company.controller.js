const Company = require("../models/companies.model");

// Create a new company
exports.createCompany = async (req, res) => {
  try {
    const exist = await Company.findOne({ email: req.body.email });
    if (exist) {
      res
        .status(409)
        .json({ message: "Company already registered with this email" });
      return;
    }
    const company = new Company(req.body);
    const savedCompany = await company.save();
    res.status(201).json(savedCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
