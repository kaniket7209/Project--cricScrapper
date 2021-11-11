const request = require('request');
const cheerio = require('cheerio');
const urlobj = require('./scorecard');


// match page 
function getallMatchesLink(url) {
    request(url, function (err, response, html) {
        if (err) {
            console.log("Error");
        }
        else {
            extractMatcheslink(html);
        }
    })
}
// scorecard
function extractMatcheslink(html) { 
    let $ = cheerio.load(html);
    let scorecardele = $("a[data-hover='Scorecard']");
    for (let i = 0; i < scorecardele.length; i++) {
        let href = $(scorecardele[i]).attr("href");
        // console.log(href);
        let fulllinkScorecard = "https://www.espncricinfo.com" + href;
        console.log(fulllinkScorecard);
        urlobj.geturlkey(fulllinkScorecard);     
    }
}

module.exports={
    getAllMatch : getallMatchesLink
}