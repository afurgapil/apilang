//react
import { useState, useEffect } from "react";
//toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//icons
import { AiOutlineSwap } from "react-icons/ai";
import { PiSwapFill } from "react-icons/pi";
import { TiTick, TiTimes } from "react-icons/ti";
//hooks
import { useTheme } from "../hooks/useTheme";
//i18n
import { useTranslation } from "react-i18next";

const App = () => {
  const [currentWord, setCurrentWord] = useState({});
  const [userInput, setUserInput] = useState("");
  const [hint, setHint] = useState("");
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [selectedLanguageL, setSelectedLanguageL] = useState("de");
  const [selectedLanguageR, setSelectedLanguageR] = useState("en");
  const [niveau, setNiveau] = useState("c1");
  const [selectedLanguageLevels, setSelectedLanguageLevels] = useState(["b1"]);
  const [allWords, setAllWords] = useState([]);
  const isDarkMode = useTheme();
  const { t } = useTranslation();
  //toasts
  const notify = () => {
    toast.success("🦄 Correct", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const showCorrect = () => {
    toast.error(
      currentWord[selectedLanguageR] + " = " + currentWord[selectedLanguageL],
      {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );
  };
  useEffect(() => {
    const randomLevelIndex = Math.floor(
      Math.random() * selectedLanguageLevels.length
    );
    const selectedLevel = selectedLanguageLevels[randomLevelIndex];
    fetchWords(selectedLevel);
  }, [selectedLanguageLevels]);

  const handleLanguageLevelChange = (level) => {
    const updatedLevels = [...selectedLanguageLevels];
    if (updatedLevels.includes(level)) {
      const index = updatedLevels.indexOf(level);
      updatedLevels.splice(index, 1);
    } else {
      updatedLevels.push(level);
    }
    setSelectedLanguageLevels(updatedLevels);
    changeNiveau();
  };
  const changeNiveau = () => {
    const randomLevelIndex = Math.floor(
      Math.random() * selectedLanguageLevels.length
    );
    const selectedLevel = selectedLanguageLevels[randomLevelIndex];
    setNiveau(selectedLevel);
  };
  const handleLanguageSwap = () => {
    const temp = selectedLanguageL;
    setSelectedLanguageL(selectedLanguageR);
    setSelectedLanguageR(temp);
  };
  const fetchWords = async (level) => {
    try {
      const response = await fetch(`http://localhost:3000/jsons/${level}`);
      const data = await response.json();
      setCurrentWord(data);
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  const toSkip = () => {
    setHint("");
    setWrongGuesses(0);
    fetchWords(niveau);
    setUserInput("");
    setAllWords((prevWords) => [...prevWords, currentWord]);
  };

  const handleFeedbackSubmit = async (wordId, isPositive) => {
    try {
      const response = await fetch("http://localhost:3000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: wordId,
          positive: isPositive ? 1 : 0,
          negative: isPositive ? 0 : 1,
        }),
      });

      if (response.ok) {
        console.log("Feedback submitted successfully");
      } else {
        console.error("Error submitting feedback:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentWordData = currentWord[selectedLanguageL];
    if (userInput.toLowerCase() === currentWordData.toLowerCase()) {
      setWrongGuesses(0);
      fetchWords(niveau);
      setUserInput("");
      setHint("");
      notify();
      setAllWords((prevWords) => [...prevWords, currentWord]);
    } else {
      const currentLength = currentWordData.length;
      setWrongGuesses(wrongGuesses + 1);
      const hint = currentWordData.substring(0, wrongGuesses + 1);
      setHint(` Hint: ${hint}`);
      if (currentLength === wrongGuesses) {
        showCorrect();
        toSkip();
      }
    }
  };

  return (
    <div
      className={`container  ${isDarkMode ? "bg-dark" : "bg-light"} w-100`}
      style={{ minHeight: "90vh", minWidth: "100%" }}
      data-bs-theme={isDarkMode ? "dark" : "light"}
    >
      <div className="row justify-content-center">
        <div className="col-md-6 w-100 d-flex justifiy-content-center align-items-center flex-column">
          <div id="section1" className="w-50 ">
            <div className="row ">
              <div className="btn-group width-50" role="group">
                <button
                  type="button"
                  className={`btn ${
                    selectedLanguageLevels.includes("a1")
                      ? "btn-primary active"
                      : "btn-secondary"
                  }`}
                  onClick={() => handleLanguageLevelChange("a1")}
                >
                  A1
                </button>
                <button
                  type="button"
                  className={`btn ${
                    selectedLanguageLevels.includes("a2")
                      ? "btn-primary active"
                      : "btn-secondary"
                  }`}
                  onClick={() => handleLanguageLevelChange("a2")}
                >
                  A2
                </button>
                <button
                  type="button"
                  className={`btn ${
                    selectedLanguageLevels.includes("b1")
                      ? "btn-primary active"
                      : "btn-secondary"
                  }`}
                  onClick={() => handleLanguageLevelChange("b1")}
                >
                  B1
                </button>
                <button
                  type="button"
                  className={`btn ${
                    selectedLanguageLevels.includes("b2")
                      ? "btn-primary active"
                      : "btn-secondary"
                  }`}
                  onClick={() => handleLanguageLevelChange("b2")}
                >
                  B2
                </button>
                <button
                  type="button"
                  className={`btn ${
                    selectedLanguageLevels.includes("c1")
                      ? "btn-primary active"
                      : "btn-secondary"
                  }`}
                  onClick={() => handleLanguageLevelChange("c1")}
                >
                  C1
                </button>
              </div>
            </div>
            <div className="card mt-2">
              <div className="card-body">
                <h1 className="text-center mb-4">
                  {selectedLanguageLevels.length > 0 &&
                    currentWord[selectedLanguageR]}
                </h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      value={userInput}
                      onChange={handleInputChange}
                      placeholder={t("textarea")}
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary p-3 m-2"
                      disabled={selectedLanguageLevels.length === 0}
                    >
                      {t("submit")}
                    </button>
                    <button
                      type="button"
                      onClick={toSkip}
                      className="btn btn-secondary p-3 m-2"
                      disabled={selectedLanguageLevels.length === 0}
                    >
                      {t("skip")}
                    </button>
                  </div>
                </form>
                {hint && <div className="text-center mt-4">{hint}</div>}
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={selectedLanguageR}
                      onChange={(e) => setSelectedLanguageR(e.target.value)}
                    >
                      <option value="en">EN</option>
                      <option value="tr">TR</option>
                      <option value="de">DE</option>
                      <option value="fr">FR</option>
                    </select>
                  </div>
                  <div className="col-md-4 text-center">
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={handleLanguageSwap}
                    >
                      <AiOutlineSwap className="fs-3" />
                    </button>
                  </div>
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={selectedLanguageL}
                      onChange={(e) => setSelectedLanguageL(e.target.value)}
                    >
                      <option value="en">EN</option>
                      <option value="tr">TR</option>
                      <option value="de">DE</option>
                      <option value="fr">FR</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {allWords.length > 0 && (
            <div id="section2" className="card mt-4 container">
              <div className="row w-100 justify-content-center">
                {allWords.map((word, index) => (
                  <div className="col-md-6 mb-3" key={index}>
                    <div className="border-bottom p-3  d-flex flex-row justify-content-between align-items-center">
                      <h5 className="card-title d-flex flex-row justify-content-center align-items-center">
                        {word[selectedLanguageR]}
                        <PiSwapFill className="align-self-center mx-2" />
                        {word[selectedLanguageL]}
                      </h5>
                      <div className="d-flex justify-content-end align-items-end ">
                        <button
                          className="btn btn-success me-2"
                          onClick={() => handleFeedbackSubmit(word.id, true)}
                        >
                          <TiTick></TiTick>
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleFeedbackSubmit(word.id, false)}
                        >
                          <TiTimes></TiTimes>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
