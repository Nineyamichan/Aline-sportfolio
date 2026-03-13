const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: __dirname + "/.env" });
console.log("Pasta atual:", __dirname);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS existe?", !!process.env.EMAIL_PASS);
console.log("EMAIL_TO:", process.env.EMAIL_TO);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend do formulário está rodando." });
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Preencha nome, e-mail e mensagem.",
    });
    
  }

  try {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_TO:", process.env.EMAIL_TO);
    console.log("EMAIL_PASS existe?", !!process.env.EMAIL_PASS);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Nova mensagem do portfólio - ${name}`,
      replyTo: email,
      text: `
Nome: ${name}
E-mail: ${email}

Mensagem:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Nova mensagem do portfólio</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
    });

    return res.status(200).json({
      message: "Mensagem enviada com sucesso.",
    });
  } catch (error) {
  console.error("Erro ao enviar e-mail:", error);
  return res.status(500).json({
    error: error.message || "Erro ao enviar mensagem.",
  });
}
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});