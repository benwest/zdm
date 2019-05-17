var React = require('react');

var Layout = require('./partials/layout.jsx');

module.exports = ({ page, site }) => (
    <Layout site={ site }>
        { page.title }
    </Layout>
)