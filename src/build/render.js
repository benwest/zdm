var fs = require('fs');
var path = require('path');
var beautify = require('js-beautify');

var TEMPLATES = path.join( process.cwd(), 'src', 'templates' );

module.exports = ( page, site ) => {
    console.log( `Rendering ${ page.slug }` );
    if ( !page.template ) {
        console.error( `No template field` );
        return '';
    }
    var templateFile = path.join( TEMPLATES, page.template + '.js' );
    if ( !fs.existsSync( templateFile ) ) {
        console.error( `Template ${ templateFile } not found` );
        return '';
    }
    var template = require( templateFile );
    var html = template( page, site );
    return beautify.html( html );
}