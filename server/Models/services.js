const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
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
  },
    location: {
        latitude: Number,
        longitude: Number
    }
});

//Service Model
const Service = mongoose.model('Service', serviceSchema);

let createService = function(userName,data, callback){
    data['user']=userName;
    Service.create(data, callback);
};

module.exports.createService = createService;

module.exports.Service = Service;
