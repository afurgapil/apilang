const fs = require("fs");

const readFeedbackData = () => {
  try {
    const data = fs.readFileSync("feedback.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading feedback data:", error);
    return {};
  }
};

const writeFeedbackData = (feedbackData) => {
  try {
    fs.writeFileSync("feedback.json", JSON.stringify(feedbackData, null, 2));
    console.log("Feedback data saved to feedback.json");
  } catch (error) {
    console.error("Error writing feedback data:", error);
  }
};

const saveFeedback = (id, isPositive) => {
  const feedbackData = readFeedbackData();

  if (feedbackData[id]) {
    if (isPositive) {
      feedbackData[id].positive++;
    } else {
      feedbackData[id].negative++;
    }
    console.log("Feedback updated:", feedbackData[id]);
  } else {
    const newFeedback = {
      id,
      positive: isPositive ? 1 : 0,
      negative: isPositive ? 0 : 1,
    };
    feedbackData[id] = newFeedback;
    console.log("New feedback added:", newFeedback);
  }

  writeFeedbackData(feedbackData);
};
module.exports = {
  readFeedbackData,
  writeFeedbackData,
  saveFeedback,
};
