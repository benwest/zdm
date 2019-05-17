var React = require('react');

var Layout = require('./partials/layout.jsx');

module.exports = ({ page, site }) => (
    <Layout site={ site }>
        <ul>
            { site.work.map( project => (
                <li key={ project.slug }>
                    <a href={ `/work/${ project.slug }` }>{ project.title }</a>
                </li>
            )) }
        </ul>
    </Layout>
)