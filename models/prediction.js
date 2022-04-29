const linearRegression = require('../public/linear-regression/index');

module.exports = class Prediction {
  constructor(horsepower, weight, displacement) {
    this.horsepower = horsepower;
    this.weight = weight;
    this.displacement = displacement;
  }

  makePrediction() {
    return linearRegression.makePrediction(this.horsepower, this.weight, this.displacement);
  }  
}