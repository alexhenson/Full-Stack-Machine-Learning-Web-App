const fs = require('fs');
const path = require('path');

const linearRegression = require('../public/linear-regression/index');

const p = path.join(
  path.dirname(process.mainModule.fileName),
  'data',
  'predictions.json'
);

const getPredictionsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Prediction {
  constructor(horsepower, weight, displacement) {
    this.horsepower = horsepower;
    this.weight = weight;
    this.displacement = displacement;
    this.mpg = this.makePrediction();
  }

  save() {
    getPredictionsFromFile((predictions) => {
      predictions.push(this);
      fs.writeFile(p, JSON.stringify(predictions), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll() {
    getProductsFromFile(cb);
  }

  makePrediction() {
    return linearRegression.makePrediction(
      this.horsepower,
      this.weight,
      this.displacement
    );
  }
};
