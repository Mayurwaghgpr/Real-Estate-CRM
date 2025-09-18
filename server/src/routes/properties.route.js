const express = require("express");
const {
  createProperty,
  getAllProperties,
  getPaginatedProperties,
  getPropertyById,
  getArchivedProperties,
  editProperty,
  toggleArchiveProperty,
} = require("../controllers/properties.controller");
const upload = require("../config/multer");

const router = express.Router();

router.post("/create", upload.array("images"), createProperty);
router.get("/p", getPaginatedProperties);
router.get("/archived/p", getArchivedProperties);
router.get("/property/:propertyId", getPropertyById);
router.get("/all", getAllProperties);
router.put("/edit/:id", upload.array("newImages"), editProperty);
router.put("/archive/:id", toggleArchiveProperty);

module.exports = router;
