// let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');
const { opensshCipherInfo } = require('sshpk');

function geturl(url){
    request(url, cb);

}
function cb(err, response, html) {
    if (err) {
        console.log("Error");
    }
    else {
        // console.log(html);
        extractdetails(html);
    }
}
//venue date result opponent runs balls fours sixes sr
// format
// ipl
// team
// player
// runs ballsfours sixes sr opponent venue date result
//common ele find first
//venue date
// result
function extractdetails(html) {
    let $ = cheerio.load(html);
    let descriptionele = $(".match-header-container>.match-header-info .description");
    let result = $(".event .status-text").text().trim();

    // console.log(descriptionele.text());
    let stringArr = descriptionele.text().split(",");
    let venue = stringArr[1];
    let date = stringArr[2];
    // console.log(venue);
    // console.log(date);
    // console.log(result);
    // find innings  
    // make table first for innings to fetch data
    let inningsArr = $(".card.content-block.match-scorecard-table .Collapsible");
    // let htmlStr = "";
    let name;
    for (let i = 0; i < inningsArr.length; i++) { // loop --> since 2 innings
        // let cHtml = $(inningsArr[i]).html();
        // htmlStr = cHtml;
        // console.log(htmlStr);
        // teamname - opp name find
        let playerName = $(inningsArr[i]).find("h5").text();
        let teamName = playerName.split("INNINGS")[0].trim();
        let oppIndex = i == 0 ? 1 : 0;
        let oppName = $(inningsArr[oppIndex]).find("h5").text();
        oppName = oppName.split("INNINGS")[0].trim();
        console.log(`${venue} | ${date}| ${chalk.greenBright(teamName)} > ${chalk.blueBright(oppName)} | ${result}`);
        //find player run ,etc for both innings
        let tabelele = $(inningsArr[i]).find(".table.batsman tbody");
        let allrows = $(tabelele).find("tr");
        for (let j = 0; j < allrows.length; j++) {
            let allCols = $(allrows[j]).find("td");
            let isworthy = $(allCols[0]).hasClass("batsman-cell");
            if (isworthy == true) {
                // console.log(allCols.text());
                //player name 
                let playerName = $(allCols[0]).text();
                let runs = $(allCols[2]).text().trim();
                let balls = $(allCols[3]).text().trim();
                let fours = $(allCols[5]).text().trim();
                let sixes = $(allCols[6]).text().trim();
                let sr = $(allCols[7]).text().trim();
                console.log(`${playerName}     { ${runs} - ${balls} - ${fours} - ${sixes} - ${sr} }`)
            }
        }
    }
}

module.exports={
    geturlkey:geturl
}