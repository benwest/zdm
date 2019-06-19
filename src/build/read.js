var fs = require('fs');
var path = require('path');
var yaml = require('yaml');

var { extensionless } = require('./utils');

var readFile = file => {
    var page = fs.existsSync( file )
        ? yaml.parse( fs.readFileSync( file, 'utf8' ) ) || {}
        : {};
    page.slug = extensionless( path.basename( file ) );
    page.file = file;
    return page;
}

var readFolder = folder => {
    if ( !fs.existsSync( folder ) ) return [];
    return fs.readdirSync( folder )
        .filter( filename => filename.endsWith( '.yml' ) )
        .map( filename => readFile( path.join( folder, filename ) ) );
}

var readFiles = files => {
    var pages = {};
    files.forEach( ({ name, file }) => {
        pages[ name ] = readFile( file );
    })
    return pages;
}

var readSite = config => {
    var site = {};
    config.collections.forEach( collection => {
        if ( collection.folder ) {
            site[ collection.name ] = readFolder( collection.folder );
        } else if ( collection.files ) {
            site[ collection.name ] = readFiles( collection.files );
        }
    })
    return site;
}

module.exports = readSite;