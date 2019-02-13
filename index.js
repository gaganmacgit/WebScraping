const rp = require('request-promise');
const cheerios = require('cheerio');
const presidentDetails = require('./individual-details');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
const wikiURL = 'https://en.wikipedia.org';

rp(url)
    .then(function (html) {
        //success!
        const number_of_presidents = cheerios('big > a', html).length;
        console.log('Number of presidents are ', number_of_presidents);
        const wikiUrls = [];
        for (let i = 0; i < number_of_presidents; i++) {
            wikiUrls.push(cheerios('big > a', html)[i].attribs.href);
        }
        return Promise.all(
            wikiUrls.map((url) => {
                return presidentDetails(wikiURL + url);
            })
        ).then(details => console.log(details));
    })
    .catch(function (err) {
        //handle error
    });