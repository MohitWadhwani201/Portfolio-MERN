require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Gmail SMTP Configuration
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

// Verify SMTP connection on startup
transporter.verify((error, success) => {
	if (error) {
		console.error("SMTP Connection Failed:", error);
	} else {
		console.log("SMTP Server Ready");
	}
});

// Contact form route
app.post("/send-message", async (req, res) => {
	const { name, email, message } = req.body;

	if (!name || !email || !message) {
		return res.status(400).json({
			success: false,
			error: "All fields are required",
		});
	}

	try {
		// Email to visitor
		const visitorMail = await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: `Thank you for contacting me, ${name}!`,
			html: `
				<p>Hi ${name},</p>
				<p>Thank you for reaching out! I have received your message and will get back to you soon.</p>
				<p>
					Connect with me on
					<a href="https://www.linkedin.com/in/MohitWadhwani201">
						LinkedIn
					</a>.
				</p>
				<p>Best regards,<br/>Mohit Wadhwani</p>
			`,
		});

		// Email to yourself
		const ownerMail = await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: process.env.EMAIL_TO,
			replyTo: email,
			subject: `New Contact Form Submission from ${name}`,
			html: `
				<h3>New Contact Form Submission</h3>

				<p><strong>Name:</strong> ${name}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Message:</strong></p>

				<p>${message}</p>
			`,
		});

		console.log("Visitor Email:", visitorMail.messageId);
		console.log("Owner Email:", ownerMail.messageId);

		return res.status(200).json({
			success: true,
			message: "Emails sent successfully",
			visitorMessageId: visitorMail.messageId,
			ownerMessageId: ownerMail.messageId,
		});
	} catch (error) {
		console.error("Email Error:", error);

		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});