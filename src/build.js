var fs = require('fs');
var path = require('path');
var yaml = require('yaml');

var TEMPLATES = path.join( process.cwd(), 'src', 'templates' );

// var allFiles = dir => {
//     var files = [];
//     fs.readdirSync( dir ).forEach( filename => {
//         var file = path.join( dir, filename );
//         if ( fs.statSync( file ).isDirectory() ) {
//             files.push( ...allFiles( file ) );
//         } else {
//             files.push( file );
//         }
//     })
//     return files;
// }

var allFiles = dir => fs.readdirSync( dir )
    .map( filename => path.join( dir, filename ) )
    .reduce( ( files, file ) => 
        fs.statSync( file ).isDirectory()
            ? [ ...files, ...allFiles( file ) ]
            : [ ...files, file ]
    , [] )

var renderSite = ( inDir, outDir ) => {
    allFiles( inDir ).forEach( file => {
        var url = path.relative( inDir, file );
        var content = yaml.parse( fs.readFileSync( file, 'utf8' ) ) || {};
        if ( !content.template ) {
            console.log( `No template field in ${ file }` );
            return;
        }
        var templateFile = path.join( TEMPLATES, content.template + '.js' );
        if ( !fs.existsSync( templateFile ) ) {
            console.log( `No template field in ${ file }` );
            return;
        }
        var template = require( templateFile );
        var html = template( content );
        var outFilename = path.basename( url ) + '.html'
        var outFile = path.join( outDir, outFilename );
        fs.writeFileSync( outFile, html, 'utf8' );
    })
    // var renderDirectory = dir => {
    //     fs.readdirSync( dir ).forEach( filename => {
    //         var file = path.join( dir, filename );
    //         if ( fs.statSync( file ).isDirectory() ) {
    //             renderDirectory( file );
    //         } else {
    //             var url = path.relative( inDir, file );
    //             var content = yaml.parse( fs.readFileSync( file, 'utf8' ) ) || {};
    //             if ( !content.template ) {
    //                 console.log( `No template field in ${ file }` );
    //                 return;
    //             }
    //             var templateFile = path.join( TEMPLATES, content.template + '.js' );
    //             if ( !fs.existsSync( templateFile ) ) {
    //                 console.log( `No template field in ${ file }` );
    //                 return;
    //             }
    //             var template = require( templateFile );
    //             var html = template( content );
    //             var outFilename = path.basename( url ) + '.html'
    //             var outFile = path.join( outDir, outFilename );
    //             fs.writeFileSync( outFile, html, 'utf8' );
    //         }
    //     })
    // }
    // renderDirectory( inDir );
}

renderSite( './src/content', './dist' );