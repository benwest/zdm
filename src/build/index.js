var fs = require('fs');
var path = require('path');
var yaml = require('yaml');
var mkdirp = require('mkdirp');

var read = require('./read');
var render = require('./render');
var { extensionless, flatten } = require('./utils');

var config = yaml.parse( fs.readFileSync( './src/cms.yml', 'utf8' ) );
var site = read( config );

flatten( site ).forEach( page => {
    var html = render( page, site );
    var url = extensionless( path.relative( './src/content', page.file ) );
    var outFile = path.join( 'dist', url + '.html' );
    mkdirp.sync( path.dirname( outFile ) );
    fs.writeFileSync( outFile, html, 'utf8' );
})