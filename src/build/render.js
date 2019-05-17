require('@babel/register')({
    plugins: [ '@babel/plugin-transform-react-jsx' ]
})

var fs = require('fs');
var path = require('path');
var React = require('react');
var { renderToStaticMarkup } = require('react-dom/server');
var beautify = require('js-beautify');

var TEMPLATES = path.join( process.cwd(), 'src', 'templates' );

module.exports = ( page, site ) => {
    console.log( `Rendering ${ page.slug }` );
    if ( !page.template ) {
        console.error( `No template field` );
        return '';
    }
    var templateFile = path.join( TEMPLATES, page.template + '.jsx' );
    if ( !fs.existsSync( templateFile ) ) {
        console.error( `Template ${ templateFile } not found` );
        return '';
    }
    var component = require( templateFile );
    var html = renderToStaticMarkup( React.createElement( component, { site, page }) );
    return beautify.html( "<!DOCTYPE html>" + html );
}