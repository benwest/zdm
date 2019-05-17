var html = require('nanohtml');

var layout = require('./partials/layout');

module.exports = ( page, site ) => layout( html`
    <ul>
        ${ site.work.map( project => html`
            <li>
                <a href="/work/${ project.slug }">${ project.title }</a>
            </li>
        `) }
    </ul>
`)