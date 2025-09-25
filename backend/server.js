require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // true for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Test transporter safely
(async () => {
  try {
    const success = await transporter.verify();
    console.log("SMTP Ready:", success);
  } catch (err) {
    console.error("SMTP Error:", err.message || err);
  }
})();

// Contact form route
app.post("/send-message", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All fields are required" });
  }

  try {
    // Send acknowledgment email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Thank you for contacting me, ${name}!`,
      html: `<p>Hi ${name},</p>
             <p>Thank you for reaching out! I have received your message and will get back to you soon.</p>
             <p>Connect with me on <a href="https://www.linkedin.com/in/MohitWadhwani201" target="_blank">LinkedIn</a>.</p>
             <p>Best regards,<br/>Mohit Wadhwani</p>`,
    });

    // Send notification email to yourself
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission from ${name}`,
      html: `<h3>New Message</h3>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    });

    return res.status(200).json({ success: true, message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending emails:", error.message || error);
    // Always respond with JSON
    return res.status(500).json({ success: false, error: error.message || "Failed to send emails" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
