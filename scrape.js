var request = require('request')
var cheerio = require('cheerio')

// function htmlToElement(stringHtml){
//   console.log('template')

//   var template = document.createElement('template')
//   stringHtml.trim()
//   template.innerHTML = stringHtml
//   console.log('template first child',template.content.firstChild)
// }

// async function cheerioScrape(url){
//   try {
//     let result = await request(url, function (error, response, dog) {
//       if (!error && response.statusCode == 200) {
//        return dog
//       }
//     });
//     console.log('this is the result', result)
//     htmlToElement(result)

//   } catch (error) {
// console.log(error)
//   }

// }
// cheerioScrape('https://onezero.medium.com/we-already-know-what-our-data-is-worth-48bca5643844')
let data = ''
async function cheerioScrape(url) {
  await request(url, function(error, response, dog) {
    if (!error && response.statusCode == 200) {
      data = dog
      return data
    }
  })
}
cheerioScrape(
  'https://onezero.medium.com/we-already-know-what-our-data-is-worth-48bca5643844'
)
console.log(data)

// request('https://news.ycombinator.com', function (error, response, html) {
//   if (!error && response.statusCode == 200) {
//     var $ = cheerio.load(html);
//     $('span.comhead').each(function(i, element){
//       var a = $(this).prev();
//       console.log(a.text());
//     });
//   }
// });

// request('https://onezero.medium.com/we-already-know-what-our-data-is-worth-48bca5643844', function (error, response, html) {
//   if (!error && response.statusCode == 200) {
//     var $ = cheerio.load(html);
//     $('link.js-glyph-').each(function(i, element){
//       var a = $(this);
//       console.log(a.href);
//     });
//   }
// });

// const $ = cheerio.load('<link rel="stylesheet" type="text/css" class="js-glyph-" id="glyph-8" href="https://glyph.medium.com/css/e/sr/latin/e/ssr/latin/e/ssb/latin/m2.css">')

// // We can use the same API as jQuery to get the desired result
// const txt = $('js-glyph-').attr('href')
// console.log(txt)
