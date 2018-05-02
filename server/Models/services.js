const mongoose = require('mongoose');




var serviceSchema = mongoose.Schema({
  user:
  {
    type: String,
  },
  serviceTitle: {
    type: String,
    require:true
  },
  serviceDescription: String,
  category: {
    type: String,
    require:true
  },
  from: String,
  to: String,
  dateTo:Date,
  dateFrom:Date,
  created_at:
  {
    type:Date,
    default:Date.now
  }
});

//Service Model
const Service = mongoose.model('Service', serviceSchema);

var createService = function(userName,data, callback){
  data["user"]=userName;
  Service.create(data, callback)
};

module.exports.createService = createService;

module.exports.Service = Service;