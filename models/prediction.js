const fs = require('fs');
const path = require('path');

const linearRegression = require('../public/linear-regression/index');

module.exports = class Prediction {
  constructor(horsepower, weight, displacement) {
    this.horsepower = horsepower;
    this.weight = weight;
    this.displacement = displacement;
  }

  save() {
    const p = path.join(
      path.dirname(process.mainModual.fileName),
      'data',
      'predictions.json'
    );
    fs.readFile(p, (err, fileContent) => {
      console.log(fileContent)
    });
  }

  makePrediction() {
    return linearRegression.makePrediction(
      this.horsepower,
      this.weight,
      this.displacement
    );
  }
};
