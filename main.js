let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const allmatchobj = require('./allmatch');
const { fstat } = require('fs');
const iplPath= path.join(__dirname,"ipl");
dirCreater(iplPath);
request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log("Error");
    }
    else {
        // console.log(html);
        extractlink(html);
    }
}

function extractlink(html) {
    let $ = cheerio.load(html);//read
    let anchor = $("a[data-hover='View All Results']");// double quote double quote issue so use ingle quote
    // console.log(anchor.text());
    let href = $(anchor).attr("href");
    // console.log(href);
    let fullLink = "https://www.espncricinfo.com" + href;
    // console.log(fullLink);
    allmatchobj.getAllMatch(fullLink);

}
function dirCreater(filepath){
    if(fs.existsSync(filepath)==false){
        fs.mkdirSync(filepath);
    }
}