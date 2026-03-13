import { useLanguage } from "../context/LanguageContext";
import translations from "../translations/translations";
import { Link } from "react-router-dom";

export default function Header() {
  const { language } = useLanguage();
  const t = translations[language] || translations.pt;

  return (
    <header className="top-nav">
      <nav className="navbar navbar-expand-lg w-100 bg-transparent">
        <div className="container-fluid">
          <span className="navbar-brand m-0"></span>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="mainNav"
          >
            <ul className="navbar-nav gap-3">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  {t.navHome ?? "Início"}
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/sobre">
                  {t.navAbout ?? "Sobre"}
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/habilidades">
                  {t.navSkills ?? "Habilidades"}
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contato">
                  {t.navContact ?? "Contato"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}