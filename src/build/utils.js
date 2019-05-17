var extensionless = file => file.substring( 0, file.lastIndexOf( '.' ) );

var flatten = site => {
    var pages = [];
    for ( var key in site ) {
        var collection = site[ key ];
        if ( Array.isArray( collection ) ) {
            pages = pages.concat( collection );
        } else {
            pages = pages.concat( Object.values( collection ) );
        }
    }
    return pages;
}

module.exports = { extensionless, flatten };