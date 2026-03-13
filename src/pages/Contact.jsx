import { useState } from "react";
import Header from "../components/Header";
import BackgroundIcons from "../components/BackgroundIcons";
import ThemeToggle from "../components/ThemeToggle";
import LanguageToggle from "../components/LanguageToggle";
import FooterIcons from "../components/FooterIcons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";

// Translate
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations/translations";

function Contact() {
  const { language } = useLanguage();
  const t = translations[language] || translations.pt;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar mensagem.");
      }

      alert("Mensagem enviada com sucesso!");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      alert(error.message || "Não foi possível enviar a mensagem.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      <BackgroundIcons />
      <Header />

      <div className="sidebar">
        <ThemeToggle />
      </div>

      <img src="gpt-me.png" className="imagem-canto-page" alt="imagem fixa" />

      <div className="theme-translate">
        <LanguageToggle />
      </div>

      <section className="contactForm">
        <div className="contact-box">
          <h2>{t.navContact ?? "Entre em contato"}</h2>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Mensagem"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar mensagem"}
            </button>
          </form>
        </div>
      </section>

      <FooterIcons />
    </main>
  );
}

export default Contact;