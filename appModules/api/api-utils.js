const fs = require("fs").promises;
const path = require("path");

async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Games API responded with status ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("Games API returned an invalid response");
    }

    return data;
  } catch (error) {
    console.warn("Games API is unavailable; using the local rating dataset.", error.message);
    const fallbackPath = path.join(__dirname, "../../dataset/rating.json");
    const fallbackData = await fs.readFile(fallbackPath, "utf8");
    return JSON.parse(fallbackData);
  }
}

function getRandomGame(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

module.exports = { getData, getRandomGame };
