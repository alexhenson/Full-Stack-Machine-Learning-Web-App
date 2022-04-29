require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const loadCSV = require('../../util/load-csv');
const LinearRegression = require('./linear-regression');
const plot = require('node-remote-plot');

let regression = null;

const trainAndTest = () => {
  let { features, labels, testFeatures, testLabels } = loadCSV(
    '../data/cars.csv',
    {
      shuffle: true,
      splitTest: 100,
      dataColumns: ['horsepower', 'weight', 'displacement'],
      labelColumns: ['mpg'],
    }
  );

  regression = new LinearRegression(features, labels, {
    learningRate: 0.1,
    iterations: 30,
    batchSize: 10,
  });

  regression.train();

  const r2 = regression.test(testFeatures, testLabels);

  plot({
    x: regression.mseHistory.reverse(),
    xLabel: 'Iteration #',
    yLabel: 'Mean Squared Error',
    title: 'Mean Squared Error By Iteration',
  });
  r2Value = (r2 * 100).toFixed(2) + '%';
  return (r2 * 100).toFixed(2) + '%';
};

const makePrediction = (horsepower, weight, displacement) => {
  return regression
    .predict([[horsepower, weight, displacement]])
    .dataSync()[0]
    .toFixed(2);
};

console.log('r2 value:', trainAndTest());
console.log("Model's Prediction of MPG:", makePrediction(100, 2, 300) + 'mpg');

exports.trainAndTest = trainAndTest;
exports.makePrediction = makePrediction;
