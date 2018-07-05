let mongoose = require('mongoose');
////Jobs Schema
let jobsSchema = mongoose.Schema({
  user:
  {
    type: String
  },
  jobTitle: {
    type: String,
    require: true
  },
  rate: Number,
  jobDescription: String,
  category: {
    type: String,
    require: true
  },
  from: String,
  to: String,
  dateTo: Date,
  dateFrom: Date,
  created_at:
  {
    type: Date,
    default: Date.now
  },

  location: {
    latitude: Number,
    longitude: Number
  },

  rating: Number,
  incrementUser: [String],
  decrementUser: [String]

});

/////Jobs Model
let Jobs = mongoose.model('Jobs', jobsSchema);

let createJob = function (userName, data, callback) {
  data['user'] = userName;
    Jobs.create(data, callback);
};

let allJobs = function (callback) {
  Jobs.aggregate([
    {
      $lookup:
       {
         from: 'users',
         localField: 'user',
         foreignField: 'userName',
         as: 'userInfo'
       }
    }
  ], function (err, data) {
    if (err) {
      throw err;
            callback(err, null);
        }
    
        callback(null, data);
    });
};

let jobByTitle = function (jobTitle, callback) {
  Jobs.findOne({jobTitle: jobTitle}, function (err, data) {
    if (err) {
      callback(err, null);
        } else {
      callback(null, data);
        }
  });
};

let getUserJob = function (jobTitle, user, callback) {
  Jobs.findOne({'jobTitle': jobTitle, 'user': user}, function (err, data) {
    if (err) {
      callback(err, null);
        } else {
      callback(null, data);
        }
  });
};

let findSome = function (title, callback) {
  let regexValue = '\.*' + title + '\.*';


    Jobs.aggregate([
    {$match: {'jobTitle': new RegExp(regexValue, 'i')}},
    {

      $lookup:
       {
         from: 'users',
         localField: 'user',
         foreignField: 'userName',
         as: 'userInfo'
       }
    }

  ], function (err, data) {
    if (err) {
      throw err;
            callback(err, null);
        }
    
        callback(null, data);
    });

};
let jobByUserName = function (userName, callback) {
  Jobs.find(userName).exec(function (err, data) {
    if (err) {
      callback(err, null);
        } else {
      callback(null, data);
        }
  });
};

let jobsByCategory = function (category, callback) {
  if (category.category !== 'All') {
    Jobs.aggregate([
      {$match: {'category': category.category}},
      {

        $lookup:
       {
         from: 'users',
         localField: 'user',
         foreignField: 'userName',
         as: 'userInfo'
       }
      }

    ], function (err, data) {
      if (err) {
        throw err;
                callback(err, null);
            }
      
            callback(null, data);
        });
    } else{
    Jobs.aggregate([
      {
        $lookup:
       {
         from: 'users',
         localField: 'user',
         foreignField: 'userName',
         as: 'userInfo'
       }
      }
    ], function (err, data) {
      if (err) {
        throw err;
                callback(err, null);
            }
      
            callback(null, data);
        });
    }
};

let jobsByStartTime = function (from, callback) {
  Jobs.find({from: from}, function (err, data) {
    if (err) {
      callback(err, null);
        } else {
      callback(null, data);
        }
  });
};

let jobsByEndTime = function (to, callback) {
  Jobs.find({to: to}, function (err, data) {
    if (err) {
      callback(err, null);
        } else {
      callback(null, data);
        }
  });
};

let updateUserJob = function (jobTitle, user, updatedData, callback) {
  Jobs.findOneAndUpdate({jobTitle: jobTitle, user: user}, {$set: updatedData}, callback);
};
let updateJobs = function (jobTitle, updatedData, callback) {
  Jobs.findOneAndUpdate({jobTitle: jobTitle}, {$set: updatedData}, callback);
};

let deleteJob = function (jobTitle, callback) {
  Jobs.deleteOne({jobTitle: jobTitle}, callback);
};

// Exporting the Model and the functions
module.exports.Jobs = Jobs;
module.exports.createJob = createJob;
module.exports.allJobs = allJobs;
module.exports.jobByTitle = jobByTitle;
module.exports.jobsByCategory = jobsByCategory;
module.exports.jobByUserName = jobByUserName;
module.exports.jobsByStartTime = jobsByStartTime;
module.exports.jobsByEndTime = jobsByEndTime;
module.exports.updateJobs = updateJobs;
module.exports.deleteJob = deleteJob;
module.exports.findSome = findSome;
module.exports.getUserJob = getUserJob;
module.exports.updateUserJob = updateUserJob;
