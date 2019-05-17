var html = require('nanohtml');

var layout = require('./partials/layout');

module.exports = ( page, site ) => layout( html`
    ${ page.title }
`)