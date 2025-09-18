const multer = require("multer");
const path = require("path");
const Documents = require("../models/documents.model");

// Upload Document
exports.uploadDocuments = async (req, res) => {
  try {
    const { leadId } = req.body;
    const userId = req.user._id;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadedDocs = [];

    for (const file of req.files) {
      // Upload file buffer to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(file.buffer);
      });

      const newDoc = new Document({
        lead: leadId,
        uploadedBy: userId,
        fileUrl: uploadResult.secure_url,
        fileName: file.originalname,
        fileType: file.mimetype,
        fileSize: file.size,
      });

      await newDoc.save();
      uploadedDocs.push(newDoc);
    }

    res.status(201).json({
      message: "Documents uploaded successfully",
      documents: uploadedDocs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get Documents for a Lead
exports.getDocumentsByLead = async (req, res) => {
  try {
    const docs = await Documents.find({ leadId: req.params.leadId }).populate(
      "uploadedBy",
      "name email"
    );
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Document
exports.deleteDocument = async (req, res) => {
  try {
    await Documents.findByIdAndDelete(req.params.id);
    res.json({ message: "Document deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
