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

//post
exports.postMakePrediction = (req, res, next) => {
  const prediction = new Prediction(100, 2, 300);
  prediction.save();
  res.redirect('/predictions');
};

exports.getPredictions = (req, res, next) => {
  const predictions = Prediction.fetchAll();
  res.render('predictions', {
    preds: predictions,
    pageTitle: 'Predictions',
    path: '/predictions',
    hasPredictions: predictions.length > 0,
  });
};
