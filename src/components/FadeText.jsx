import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function FadeText({ pt, en }) {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(true);
  const [text, setText] = useState(() => (language === "pt" ? pt : en));

  useEffect(() => {
    setVisible(false);

    const timeout = setTimeout(() => {
      setText(language === "pt" ? pt : en);
      setVisible(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, [language, pt, en]);

  return (
    <span className={`fade-text ${visible ? "" : "hidden"}`}>
      {text}
    </span>
  );
}
