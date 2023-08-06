const puppeteer = require("puppeteer");
const fs = require("fs");
const { updateTimestamp } = require("./utils/update_timeout");
let targetDate = "2023-10-10";

updateTimestamp(targetDate);
async function startScrapping() {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      devtools: true,
      args: ["--disable-web-security"],
    });
    const page = await browser.newPage();

    let data = fs.readFileSync("data/persist_lgb_token.json");
    let { persist_lgb, token } = JSON.parse(data);

    await page.goto("https://reservation.lesgrandsbuffets.com/");
    // Nettoyer le local storage de la page
    await page.evaluate(() => {
      localStorage.clear();
    });

    await page.evaluate(
      (token, persist_lgb) => {
        localStorage.setItem("token", token);
        localStorage.setItem("persist:lgb", JSON.stringify(persist_lgb));
      },
      token,
      persist_lgb
    );

    await page.goto("https://reservation.lesgrandsbuffets.com/date-and-guests");
    await page.setViewport({ width: 1080, height: 1024 });
    console.log("Script Lunched think close ctr + C");
    
  } catch (err) {

    console.error("An error occurred :", err);

  }
}
startScrapping();
