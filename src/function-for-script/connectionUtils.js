const puppeteer = require("puppeteer");

async function connectToLGB(page, dataToken) {

  const { persist_lgb, token } = dataToken;

  await page.goto("https://reservation.lesgrandsbuffets.com/");
  await page.waitForTimeout(500);
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
  await page.waitForTimeout(600);
  await page.goto("https://reservation.lesgrandsbuffets.com/date-and-guests");
  // await page.setViewport({ width: 1080, height: 1024 });

  console.log("Connection to lgb/date-and-guests is ok");
}

module.exports = { connectToLGB };