var fs = require('fs');
var path = require('path');
var yaml = require('yaml');
var mkdirp = require('mkdirp');

var TEMPLATES = path.join( process.cwd(), 'src', 'templates' );

var extensionless = file => file.substring( 0, file.lastIndexOf( '.' ) )

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
        var url = extensionless( path.relative( inDir, file ) );
        console.log( `Rendering ${ url }` );
        var content = yaml.parse( fs.readFileSync( file, 'utf8' ) ) || {};
        if ( !content.template ) {
            console.error( `No template field` );
            return;
        }
        var templateFile = path.join( TEMPLATES, content.template + '.js' );
        if ( !fs.existsSync( templateFile ) ) {
            console.error( `Template ${ content.template } not found` );
            return;
        }
        var template = require( templateFile );
        var html = template( content );
        var outFile = path.join( outDir, url + '.html' );
        mkdirp.sync( path.dirname( outFile ) );
        fs.writeFileSync( outFile, html, 'utf8' );
    })
}

// var readSite = root => {
//     var site = {};
    
// }

// var flatten = site => {
//     var pages = [];
    
// }

// var renderSite = ( site, outDir ) => {
//     flatten( site ).forEach( page => {
//         console.log( `Rendering ${ page.url }` );
//         if ( !page.template ) {
//             console.error( `No template field` );
//             return;
//         }
//         var templateFile = path.join( TEMPLATES, page.template + '.js' );
//         if ( !fs.existsSync( templateFile ) ) {
//             console.error( `Template ${ page.template } not found` );
//             return;
//         }
//         var template = require( templateFile );
//         var html = template( page, site );
//         var outFile = path.join( outDir, page.url + '.html' );
//         mkdirp.sync( path.dirname( outFile ) );
//         fs.writeFileSync( outFile, html, 'utf8' );
//     })
// }


renderSite( './src/content', './dist' );