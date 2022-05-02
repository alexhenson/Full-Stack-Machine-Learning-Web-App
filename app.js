const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const indexRoute = require('./routes/index');
const predictiveRoute = require('./routes/predictive');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute);
app.use(predictiveRoute);

app.use(errorController.get404)

app.listen(3000);