var React = require('react');

module.exports = ({ site, children }) => (
    <html lang="en">
        <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
            <title>ZDM</title>
            <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        </head>
        <body>
            { children }
            <script src="./bundle.js"/>
        </body>
    </html>
)