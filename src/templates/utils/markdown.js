var remark = require('remark')
var recommended = require('remark-preset-lint-recommended')
var html = require('remark-html')
var visit = require('unist-util-visit');
var _srcset = require('./srcset');

var srcsetImages = widths => node => visit( node, 'image', image => {
    console.log( image );
})

var parser = remark()
  .use( html )
  .use( srcsetImages )
  
module.exports = md => parser.processSync( md );