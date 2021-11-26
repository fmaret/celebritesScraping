const puppeteer = require("puppeteer");
const fs = require("fs");
(async () => {
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();


  // VARIABLES A MODIFIER SI ON CHANGE DE PAGE

  nbPages = 15
  lien = "https://anniversaire-celebrite.com/categories/chanteurs-"
  nomJson = "chanteurs.json"



  // CODE PRINCIPAL

  for (let i = 1; i <= nbPages; i++) {

    await page.goto(lien+i);
    const result = await page.evaluate(() => {
      let y = [];
      document
        .querySelectorAll(".column.col-2")
        .forEach((e) => {
          y.push({ "answer": e.querySelector(".celnom > a").innerHTML.trim(), "url": e.querySelector(".celimage > img").src })
        });




      return { y };
    });
    //console.log(result);
    let donnees = JSON.parse(fs.readFileSync("./"+nomJson, "utf8"));
    let nouvellesDonnees = donnees.concat(result.y)
    fs.writeFileSync("./"+nomJson, JSON.stringify(nouvellesDonnees));
  }
  console.log("FINI")

})();



