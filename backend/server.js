require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secure: true, // true for 465, false for other ports
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

// Test transporter
transporter.verify((error, success) => {
	if (error) console.log("SMTP Error:", error);
	else console.log("SMTP Ready:", success);
});

// Contact form route
app.post("/send-message", async (req, res) => {
	const { name, email, message } = req.body;

	if (!name || !email || !message) {
		return res.status(400).json({ error: "All fields are required" });
	}

	try {
		// 1️⃣ Email to user (acknowledgment)
		await transporter.sendMail({
			from: process.env.SMTP_USER,
			to: email,
			subject: `Thank you for contacting me, ${name}!`,
			html: `<p>Hi ${name},</p>
                   <p>Thank you for reaching out! I have received your message and will get back to you soon.</p>
                   <p>Meanwhile, feel free to connect with me on <a href="https://www.linkedin.com/in/MohitWadhwani201" target="_blank">LinkedIn</a>.</p>
                   <p>Best regards,<br/>Mohit Wadhwani</p>`,
		});

		// 2️⃣ Email to yourself (notification)
		await transporter.sendMail({
			from: process.env.SMTP_USER,
			to: process.env.EMAIL_TO,
			subject: `New Contact Form Submission from ${name}`,
			html: `<h3>New Message from Portfolio Form</h3>
                   <p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong><br/>${message}</p>`,
		});
		console.log("Emails sent successfully");
		res.status(200).json({ success: true, message: "Emails sent successfully!" });
	} catch (error) {
		console.error("Error sending emails:", error);
		res.status(500).json({ error: "Failed to send emails" });
	}
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
