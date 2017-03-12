
exports.index = function(req, res){
  res.render('index', { title: 'foris-io' });
};

exports.hometest = function(req, res){
    res.render('indv_sensors', { title: 'Salinity', json_name: "Salinity", color: "#C71585" });
};

