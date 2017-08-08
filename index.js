'use strict';

//////////////////////////////
// Requires
//////////////////////////////
const express = require('express');
const path = require('path');
const chokidar = require('chokidar');
const nunjucks = require('nunjucks');
const request = require('request');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

const app = express();

const routes = require('./routes/route');

app.set('port', process.env.PORT || 8080);
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

routes(app);

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true
});


//////////////////////////////
// Start the server
//////////////////////////////
app.listen(app.get('port'), () => {
    // Mean to console.log out, so disabling
    console.log(`Server starting on: ` + app.get('port')); // eslint-disable-line no-console
});
