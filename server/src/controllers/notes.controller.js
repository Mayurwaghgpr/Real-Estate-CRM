const Notes = require("../models/notes.model");

exports.createNote = async (req, res) => {
  try {
    const { title, description, leads, createdBy } = req.body;

    const note = await Notes.create({ title, description, leads, createdBy });

    res.status(201).json({ success: true, data: note });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getNotesByLeadId = async (req, res) => {
  try {
    const { leadId } = req.params;

    const notes = await Notes.find({ leads: leadId })
      .populate("createdBy", "userName email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Notes.findByIdAndDelete(id);

    if (!deletedNote) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    res.status(200).json({ success: true, message: "Note deleted" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
