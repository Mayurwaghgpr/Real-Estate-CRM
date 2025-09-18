const EmailTemplate = require("../models/EmailTemplates.model.js");
const Leads = require("../models/Leads.model.js");
const { sendEmail } = require("../utils/transporter.js");

const sendBulkEmails = async (req, res) => {
  try {
    const { subject, body, filter, templateId } = req.body;

    let emailSubject = subject;
    let emailBody = body;

    if (templateId) {
      const template = await EmailTemplate.findById(templateId);
      if (!template)
        return res.status(404).json({ message: "Template not found" });
      emailSubject = template.subject;
      emailBody = template.body;
    }

    const leads = await Leads.find(filter || {}).select("email leadsName");
    const results = [];

    for (const lead of leads) {
      if (!lead.email) continue;

      const personalizedBody = emailBody
        .replace(/{{name}}/g, lead.leadsName || "Customer")
        .replace(/{{email}}/g, lead.email);

      try {
        await sendEmail(lead.email, emailSubject, personalizedBody);
        results.push({ email: lead.email, status: "success" });
      } catch (err) {
        results.push({
          email: lead.email,
          status: "failed",
          error: err.message,
        });
      }
    }

    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  sendBulkEmails,
};
