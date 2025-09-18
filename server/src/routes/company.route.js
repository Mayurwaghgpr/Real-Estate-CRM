const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company.controller");

router.post("/register", companyController.createCompany);

module.exports = router;
