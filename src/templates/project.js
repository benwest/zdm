var html = require('nanohtml');
var raw = require('nanohtml/raw');
var layout = require('./partials/layout');
var markdown = require('./utils/markdown');

module.exports = ( page, site ) => layout( html`
    ${ page.title }
    ${ raw( markdown( page.body || '' ) ) }
`)