import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../hooks/useTheme";

function Footer() {
  const isDarkMode = useTheme();

  return (
    <footer
      className="footer bg-light"
      data-bs-theme={isDarkMode ? "dark" : "light"}
    >
      <div className="container text-center">
        <p className="mb-0">
          All rights reserved &copy; 2023{" "}
          <span>
            <a
              href="https://github.com/afurgapil"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none"
              aria-label="GitHub Link"
            >
              GAPIL
              <i className="bi bi-github ms-1"></i>
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
