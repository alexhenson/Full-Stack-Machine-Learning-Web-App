const Prediction = require('../models/prediction');
const linearRegression = require('../public/linear-regression/index');


// This should also run the model so that a prediction can be make
exports.getPredictive = (req, res, next) => {
  res.render('predictive', {
    pageTitle: 'Predictive Method',
    path: '/predictive',
    r2: linearRegression.trainAndTest(),
  });
};

// This should take user input and use it to make a prediction
exports.makePrediction = (req, res, next) => {
  const prediction = new Prediction(
    req.body.horsepower,
    req.body.weight,
    req.body.displacement
  );
  prediction.save();
  res.render('predictive', {
    pageTitle: 'Predictive Method',
    path: '/predictive',
    r2: linearRegression.trainAndTest(),
    prediction: prediction.makePrediction(),
  });
};

exports.getPredictions = (req, res, next) => {
  const predictions = Prediction.fetchAll();
  res.render('predictive', {
    // need to figure out what to put here
  })
}
