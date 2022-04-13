const path = require('path');

const express = require('express');
// import * as d3 from "d3";
// const mongoConnect = require('./util/database');
// const mongoose = require('mongoose');

const app = express();

const indexRoutes = require('./routes/index');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

// mongoConnect((client) => {
//   console.log(client);
//   app.listen(3000);
// })

// mongoose.connect('')
// console.log(d3);

// d3.select('div')
//   .selectAll('p')
//   .data([1, 2, 3])
//   .enter()
//   .append('p')
//   .text(dta => dta);


app.listen(3000);