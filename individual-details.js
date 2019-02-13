const rp = require('request-promise');
const cheerios = require('cheerio');
const president_details = (url) => {    
    return rp(url)
        .then(function (html) {
            return {
                name: cheerios('.firstHeading', html).text(),
                birthday: cheerios('.bday', html).text()
            }
        })
        .catch(function (err) {
            //handle error
        });
}
module.exports = president_details;