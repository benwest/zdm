

var fs = require('fs');
var path = require('path');

var TEMPLATES = path.join( process.cwd(), 'src', 'templates' );

module.exports = ( page, site ) => {
    console.log( `Rendering ${ page.slug }` );
    if ( !page.template ) {
        console.error( `No template field` );
        return '';
    }
    var templateFile = path.join( TEMPLATES, page.template + '.js' );
    if ( !fs.existsSync( templateFile ) ) {
        console.error( `Template ${ page.template } not found` );
        return '';
    }
    var template = require( templateFile );
    
    return template( page );
}