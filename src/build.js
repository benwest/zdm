var fs = require('fs');
var path = require('path');
var yaml = require('yaml');

var TEMPLATES = path.join( process.cwd(), 'src', 'templates' );

var allFiles = dir => {
    var files = [];
    fs.readdirSync( dir ).forEach( filename => {
        var file = path.join( dir, filename );
        if ( fs.statSync( file ).isDirectory() ) {
            files.push( ...allFiles( file ) );
        } else {
            files.push( file );
        }
    })
    return files;
}

var renderSite = ( inDir, outDir ) => {
    allFiles( inDir ).forEach( file => {
        var url = path.relative( inDir, file );
        console.log( `Rendering ${ url }` );
        var content = yaml.parse( fs.readFileSync( file, 'utf8' ) ) || {};
        if ( !content.template ) {
            console.error( `No template field` );
            return;
        }
        var templateFile = path.join( TEMPLATES, content.template + '.js' );
        if ( !fs.existsSync( templateFile ) ) {
            console.error( `Template ${ templateFile } not found` );
            return;
        }
        var template = require( templateFile );
        var html = template( content );
        var outFilename = path.basename( url ) + '.html'
        var outFile = path.join( outDir, outFilename );
        fs.writeFileSync( outFile, html, 'utf8' );
    })
}

renderSite( './src/content', './dist' );