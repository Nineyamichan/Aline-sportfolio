import "./App.css";

// Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import FooterIcons from "./components/FooterIcons";
import LanguageToggle from "./components/LanguageToggle";
import FadeText from "./components/FadeText";
import BackgroundIcons from "./components/BackgroundIcons";

// Contact Page
import Contact from "./pages/Contact";

// Translate
import { useLanguage } from "./context/LanguageContext";
import translations from "./translations/translations";

function Home() {
  const { language } = useLanguage();
  const t = translations[language] || translations.pt;

  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      <BackgroundIcons />
      <Header />

      <div className="sidebar">
        <ThemeToggle />
      </div>
      <img src="octocat.png" className="imagem-canto" alt="imagem fixa" />
      <div className="theme-translate">
        <LanguageToggle />
      </div>

      <h1 className="title">
        <FadeText pt={translations.pt.role} en={translations.en.role} />
      </h1>

      <p className="fade-wrap">
        <span className="code-bracket"></span>
        <FadeText
          pt={translations.pt.text}
          en={translations.en.text}
        />
        <span className="code-bracket"></span>
      </p>

      <FooterIcons />
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/contato" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;