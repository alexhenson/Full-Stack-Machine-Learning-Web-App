const fs = require('fs');
const path = require('path');

const linearRegression = require('../public/linear-regression/index');

const predictions = [];

module.exports = class Prediction {
  constructor(horsepower, weight, displacement) {
    this.horsepower = horsepower;
    this.weight = weight;
    this.displacement = displacement;
  }

  save() {
    predictions.push(this);
    // const p = path.join(
    //   path.dirname(process.mainModual.fileName),
    //   'data',
    //   'predictions.json'
    // );
    // fs.readFile(p, (err, fileContent) => {
    //   console.log(fileContent)
    // });
  }

  static fetchAll() {
    return products;
  }

  makePrediction() {
    return linearRegression.makePrediction(
      this.horsepower,
      this.weight,
      this.displacement
    );
  }
};
