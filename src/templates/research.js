var html = require('nanohtml');

var layout = require('./partials/layout');

module.exports = ( page, site ) => layout( html`
    <ul>
        ${ site.research.map( post => html`
            <li>
                <a href="/research/${ post.slug }">${ post.title }</a>
            </li>
        `) }
    </ul>
`)