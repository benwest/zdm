var html = require('nanohtml');
var layout = require('./partials/layout');
var srcset = require('./utils/srcset');

module.exports = ( page, site ) => layout( html`
    <ul>
        ${ site.work.map( project => html`
            <li>
                <a href="/work/${ project.slug }">
                    <img srcset="${ srcset( project.thumbnail ) }"/>
                    ${ project.title }
                </a>
            </li>
        `) }
    </ul>
`)