
exports.index = function(req, res){
  res.render('index', { title: 'foris-io' });
};

exports.hometest = function(req, res){
    res.render('home_test', { title: 'foris-io' });
};

