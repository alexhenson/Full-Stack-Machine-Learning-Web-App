// const fs = require('fs');
// const path = require('path');

// const linearRegression = require('../public/linear-regression/index');

const predictions = [];

module.exports = class Prediction {
  constructor(h) {
    this.horsepower = h;
    // this.weight = weight;
    // this.displacement = displacement;
    // this.mpg = this.makePrediction();
  }

  save() {
    predictions.push(this);
  }

  static fetchAll() {
    return predictions;
  }

  // makePrediction() {
  //   return linearRegression.makePrediction(
  //     this.horsepower,
  //     this.weight,
  //     this.displacement
  //   );
  // }
};
