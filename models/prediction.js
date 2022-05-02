// const fs = require('fs');
// const path = require('path');

const linearRegression = require('../public/linear-regression/index');

const predictions = [];

module.exports = class Prediction {
  constructor(t, w, d) {
    this.horsepower = t;
    this.weight = w;
    this.displacement = d;
    this.mpg = this.makePrediction();
  }

  save() {
    predictions.push(this);
  }

  static fetchAll() {
    return predictions;
  }

  makePrediction() {
    return linearRegression.makePrediction(
      this.horsepower,
      this.weight,
      this.displacement
    );
  }
};
