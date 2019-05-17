var React = require('react');

var Layout = require('./partials/layout.jsx');

module.exports = ({ page, site }) => (
    <Layout site={ site }>
        { site.research.map( post => (
            <h1>{ post.title }</h1>
        )) }
    </Layout>
)