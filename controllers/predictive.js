// This should also run the model so that a prediction can be make
exports.getPredictive = (req, res, next) => {
  res.render('predictive', {
    pageTitle: 'Predictive Method',
    path: '/predictive',
  });
};

// This should take user input and use it to make a prediction
exports.makePrediction = (req, res, next) => {

}

