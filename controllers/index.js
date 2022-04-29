exports.getDescriptive = (req, res, next) => {
  res.render('index', {
    pageTitle: 'Descriptive Methods',
    path: '/',
  });
};
