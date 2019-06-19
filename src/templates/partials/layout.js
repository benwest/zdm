var html = require('nanohtml');

module.exports = children => html`
    <!doctype html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>ZDM</title>
            <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
            <link rel="stylesheet" href="/scss/style.css">
        </head>
        <body>
            <h1>zero-degree machine</h1>
            <nav>
                <a href="/">Work</a>
                <a href="/office">Office</a>
                <a href="/research">Research</a>
                <a href="/press">Press</a>
            </nav>
            ${ children }
            <script src="/js/bundle.js"></script>
        </body>
    </html>
`