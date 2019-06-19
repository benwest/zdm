var html = require('nanohtml');
var raw = require('nanohtml/raw');
var layout = require('./partials/layout');
var marked = require('marked');

module.exports = ( page, site ) => layout( html`
    ${ page.title }
    ${ raw( marked( page.body || '' ) ) }
`)