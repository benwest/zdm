var fs = require('fs');
var path = require('path');
var yaml = require('yaml');

var TEMPLATES = path.join( process.cwd(), 'src', 'templates' );

var renderSite = ( inDir, outDir ) => {
    var renderDirectory = dir => {
        fs.readdirSync( dir ).forEach( filename => {
            var file = path.join( dir, filename );
            if ( fs.statSync( file ).isDirectory() ) {
                renderDirectory( file );
            } else {
                var url = path.relative( inDir, file );
                var content = yaml.parse( fs.readFileSync( file, 'utf8' ) ) || {};
                if ( !content.template ) {
                    console.log( `No template field in ${ file }` );
                    return;
                }
                var templatePath = path.join( TEMPLATES, content.template + '.js' );
                if ( !fs.existsSync() )
                var template = require( `./templates/${ content.template }` );
                var html = template( content );
                var outFilename = path.basename( url ) + '.html'
                var outFile = path.join( outDir, outFilename );
                fs.writeFileSync( outFile, html, 'utf8' );
            }
        })
    }
    renderDirectory( inDir );
}

renderSite( './src/content', './dist' );