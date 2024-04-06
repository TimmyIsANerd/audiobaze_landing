const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const port = process.env.PORT || 3000;
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static("assets"));

// Routes
app.get("/", (req, res) => {
  console.log(`Request made : ${req.url}`);
  return res.sendFile(__dirname + "/index.html");
});

app.get("/status", async (req, res) => {
  return res.status(200).json({message:"Page is Live🚀"});
});

app.post("/send-email", async (req, res) => {
  const { fullName, emailAddress, message } = req.body;

  if (!fullName || !emailAddress || !message) {
    return res.status(400).json({
      message: "Empty or Invalid Request from Client Side",
    });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: SMTP_PORT,
    secure: false,
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `${emailAddress}`,
      to: "adefeyitimi@gmail.com",
      subject: "Inquiries on Audiobaze",
      text: messages,
    });

    return res.status(200).json("Successfully Delivered Message...");
  } catch (error) {
    return res.status(500).json({
      message: "Failed to Deliver Message",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
