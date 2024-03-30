const express = require("express");
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(cookieParser());

const jwtSecret = process.env.JWT_SECRET;

// Konfigurasi OAuth2.0
const oAuth2Client = new OAuth2Client(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	"http://localhost:3000/auth/google/callback"
);

// Mengirim pengguna ke halaman otentikasi Google
app.get("/auth/google", (req, res) => {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: "offline",
		scope: [
			"https://www.googleapis.com/auth/forms",
			"https://www.googleapis.com/auth/drive",
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/forms.responses.readonly",
		],
	});
	res.redirect(authUrl);
});

// Mengambil token akses setelah pengguna memberikan izin
app.get("/auth/google/callback", async (req, res) => {
	const { code } = req.query;
	const { tokens } = await oAuth2Client.getToken(code);

	const jwtToken = jwt.sign(tokens, jwtSecret);

	res.cookie("jwtToken", jwtToken, { httpOnly: true });

	res.redirect("/");
});

// Menggunakan token akses yang sudah diperoleh dari JWT
app.get("/form", async (req, res) => {
	try {
		const formId = "1oJ8bLftGmWudrVDDVVUYU7-WKzMUqK9xds-b54QaZwY";
		const googleForms = google.forms({
			version: "v1",
			auth: oAuth2Client,
		});

		const jwtToken = req.cookies.jwtToken;

		const decodedToken = jwt.verify(jwtToken, jwtSecret);

		oAuth2Client.setCredentials(decodedToken);

		const response = await googleForms.forms.responses.list({
			formId: formId,
		});
		res.send(response.data);
	} catch (error) {
		console.log("Error:", error.message);
		res.status(500).send("Internal Server Error");
	}
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
