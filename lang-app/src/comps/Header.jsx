//logo
import logoWhite from "../assets/logo-white.svg";
import logoBlack from "../assets/logo-black.svg";
//i18n
import i18n from "i18next";
import { useTranslation } from "react-i18next";
//react
import { useState } from "react";
import { Link } from "react-router-dom";
//icon
import { BiSun, BiMoon } from "react-icons/bi";
//hook
import { useTheme } from "../hooks/useTheme";
//store
import { useDispatch } from "react-redux";
import { setTheme } from "../store/slicers/theme";
function Header() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isDarkMode = useTheme();

  const handleModeToggle = () => {
    dispatch(setTheme(!isDarkMode));
  };
  const handleLanguageChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedLanguage(selectedValue);
    changeLanguage(selectedValue);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
      data-bs-theme={isDarkMode ? "dark" : "light"}
    >
      <div className="container">
        <a className="navbar-brand" href="#">
          <div className="d-flex align-items-center">
            {isDarkMode ? (
              <img
                src={logoBlack}
                alt="Logo"
                className="logo border-end border-black p-2"
                style={{ fill: "white" }}
              />
            ) : (
              <img
                src={logoWhite}
                alt="Logo"
                className="logo border-end border-black p-2"
              />
            )}
            <h1
              style={{ fontFamily: "Lora, serif" }}
              className="logo-text ps-2"
            >
              APILANG
            </h1>
          </div>
        </a>
        <div className="navbar-nav d-flex align-items-center">
          <Link className="nav-link" to="/">
            {t("home")}
          </Link>
          <Link className="nav-link" to="/contact">
            {t("contact")}
          </Link>

          <div className="ml-auto">
            <select
              className={`form-select ${isDarkMode ? "text-white" : ""}`}
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="en">🇺🇸 {t("en")}</option>
              <option value="tr">🇹🇷 {t("tr")}</option>
              <option value="de">🇩🇪 {t("de")}</option>
              <option value="fr">🇫🇷 {t("fr")}</option>
            </select>
          </div>
          <div className="ms-5 ">
            <button
              className={`btn btn-lg ${isDarkMode ? "btn-light" : "btn-dark"}`}
              onClick={handleModeToggle}
            >
              {isDarkMode ? <BiSun /> : <BiMoon />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
