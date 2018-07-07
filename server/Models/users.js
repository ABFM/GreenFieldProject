const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt-nodejs');

////User Schema
const usersSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    email:String,
    password: String,
    email:String,
    gender: String,
    phoneNumber: {
        type: Number,
        required: true
    },
    address: String,
    age: {
        type: Number,
        required: true
    },
    nationality: String,
    image:String
 
});

//User Model
const Users = mongoose.model('Users', usersSchema);

////hashing the password
const hashPassword = function(password, callback) {
    let saltRounds = 10;
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(password, salt);
    callback(hash);
};
const createUsers = function(data, callback){
    let userdata = data;
    //////add the hashed password to the data
    hashPassword(data.password, function(hashed){
        userdata['password'] = hashed;
    });
    ///save to database
    Users.create(userdata, callback);
};
let getUser = function(userName, password, callback){
    ///query for checking the usename
    let query = Users.where({ userName: userName });
    query.findOne(function(err, userdata){
        if(err){
            callback(err,null);
        } else {
            if(userdata){
                ////checking the password
                if(bcrypt.compareSync(password, userdata.password)){
                    //retrieve the data if the user is exist 
                    callback(null, userdata);
                }
                else{
                    callback('wrong password', null);
                }
            }else{
                callback('Invalid User Name', null);
            }
    
      
        }
    });
};

let getUserInfo= function(userName, callback){
    ///query for checking the usename
    let query = Users.where({ userName: userName });
    query.findOne(function(err, userdata){
        if(err){
            callback(err,null);
        } else {

            callback(null, userdata);
        }
    });
};
let updateUsers = function(userName, updatedData, callback){
    Users.findOneAndUpdate({userName: userName}, {$set: updatedData}, callback);
};
///update user info based on the user name
let deleteUser = function(userName, callback){
    ///delete user
    Users.deleteOne({userName:userName}, callback);
};
module.exports.Users = Users;
module.exports.createUsers = createUsers;
module.exports.updateUsers = updateUsers;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
module.exports.getUserInfo = getUserInfo;


