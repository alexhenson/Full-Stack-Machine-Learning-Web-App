require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const loadCSV = require('../load-csv');
const LogisticRegression = require('./logistic-regression');
const plot = require('node-remote-plot');
const _ = require('lodash');

const { features, labels, testFeatures, testLabels } = loadCSV(
  '../data/modern-car-data.csv',
  {
    dataColumns: ['make','model','year', 'market_category'],
    labelColumns: ['msrp'],
    shuffle: true,
    splitTest: 2000,
    converters: {
      msrp: (value) => {
        const msrp = parseFloat(value);

        if (msrp < 30000) {
          return [1, 0, 0];
        } else if (msrp < 60000) {
          return [0, 1, 0];
        } else {
          return [0, 0, 1];
        }
      },
    },
  }
);

const regression = new LogisticRegression(features, _.flatMap(labels), {
  learningRate: 0.5,
  iterations: 40,
  batchSize: 100,
});

regression.train();

console.log(regression.test(testFeatures, _.flatMap(testLabels)));

plot({
  x: regression.costHistory.reverse(),
  xLabel: 'Iteration #',
  yLabel: 'Fake',
  title: 'Cost History by Iteration',
});

regression.predict()
