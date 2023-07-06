import { useForm, ValidationError } from "@formspree/react";
import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "react-i18next";

function Contact() {
  const [state, handleSubmit] = useForm("maygynrj");
  const isDarkMode = useTheme();
  const { t } = useTranslation();

  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }

  return (
    <div
      className={`container w-100 d-flex justify-content-center align-items-start ${
        isDarkMode ? "bg-dark" : "bg-light"
      } ${isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}
      data-bs-theme={isDarkMode ? "dark" : "light"}
      style={{ minHeight: "90vh", minWidth: "100%" }}
    >
      <form onSubmit={handleSubmit} className="py-5 " style={{ width: "80%" }}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            className="form-control"
            id="email"
            type="email"
            name="email"
            placeholder={t("email")}
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            placeholder={t("message")}
            rows="5"
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={state.submitting}
        >
          {t("submitII")}
        </button>
      </form>
    </div>
  );
}

export default Contact;
