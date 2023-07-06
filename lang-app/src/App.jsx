import { Routes, Route } from "react-router-dom";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import enTranslation from "./languages/en.json";
import trTranslation from "./languages/tr.json";
import deTranslation from "./languages/de.json";
import frTranslation from "./languages/fr.json";
import Header from "./comps/Header";
import Footer from "./comps/Footer";
import Main from "./pages/Main";
import Contact from "./pages/Contact";

i18n.use(initReactI18next).init({
  lng: "en",
  resources: {
    en: {
      translation: enTranslation,
    },
    tr: {
      translation: trTranslation,
    },
    de: {
      translation: deTranslation,
    },
    fr: {
      translation: frTranslation,
    },
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
