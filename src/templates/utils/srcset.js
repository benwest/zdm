var queryString = require('query-string');

module.exports = ( url, widths = [ 200, 400, 800, 1200, 1600, 2000 ] ) =>
    widths
        .map( w => `${ url }?${ queryString.stringify({ nf_resize: 'fit', w }) } ${ w }w` )
        .join(', ')