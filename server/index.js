const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const redirect = require('express-redirect');
const Users = require('./Models/users');
const Jobs = require('./Models/jobs');
const service = require('./Models/services');
const msg = require('./Models/messages');
const Nexmo = require('nexmo');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressValidtor = require('express-validator');
const mongoStore = require('connect-mongo')(session);



const nexmo = new Nexmo({
    apiKey: '5e260543',
    apiSecret: 's6S4tx56f3jIEnuF'
});


//it generates a unique id for the session
let generateSecret = function (){
    let  j, x;
    let random = ['f', 'b', 'C', 'v', 'I', 'f', 'N', 'E', 'j', 'w', 'i', 'H', 'N', 'H', 'z', '7', 'n', 'n', 'a', '3', 'V', 'I', 'Q', 'J', 'Q'];
    for (let i = random.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = random[i];
        random[i] = random[j];
        random[j] = x;
    }
    return random.join('');
};

const app = express();
redirect(app);

//connects the server with client side
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json({limit: '50mb'}));  // make a limit for the photos
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(expressValidtor());
app.use(session({
    secret: generateSecret(),
    saveUninitialized: false,
    resave: false,
    store:new mongoStore({mongooseConnection: mongoose.connection}),
    cookie:{maxAge: 180*60*1000}
}));


app.post('/increse', function(req, res){
    let id = req.body.jobId;
	
    if(req.session.userName){
        Jobs.Jobs.findOne({_id: id},function(err, found){
            if(err){
                throw err;
            }else{

                if(found){
                    if(found.incrementUser.includes(req.session.userName)){
                        res.send(found);
                    }else{
                        Jobs.Jobs.update({_id: id}, { $push: {incrementUser:req.session.userName}, $pull:{decrementUser : req.session.userName}, $inc:{rating: + 1} }, function(err,success){
                            if(err){
                                throw err;
                            }
                            else{
                                Jobs.Jobs.findOne({_id: id}, function(err, data){
                                    if(err){
                                        throw err;
                                    }else{
                                        res.send(data);
                                    }
                                });
								
                            }
                        });
                    }	
						
                }
            }
        });
    }
    else{
        res.sendStatus(404);
    }
	
});


app.post('/decrese', function(req, res){
    
    let id = req.body.jobId;
	
    if(req.session.userName){
        Jobs.Jobs.findOne({_id:id},function(err, found){
            if(err){
                throw err;
            }else{
                if(found){
                    if(found.decrementUser.includes(req.session.userName)){
                        res.send(found);
                    }else{
                        Jobs.Jobs.update({_id: id},{ $push: {decrementUser:req.session.userName}, $pull:{incrementUser : req.session.userName}, $inc:{rating: - 1} }, function(err,success){
                            if(err){
                                throw err;
                            }
                            else{
                                Jobs.Jobs.findOne({_id:id},function(err,data){
                                    if(err){
                                        throw err;
                                    }else{
                                        res.send(data);
                                    }
                                });
								
                            }
                        });
                    }		
                }
            }
        });
    }
    else{res.sendStatus(404);
    }
	
});

// sending a SMS for the user in the Service homepage
app.post('/serveiceSms', (req, res) => { 

    const number = req.body.number;
    const text = req.body.text;
	
    nexmo.message.sendSms(number, '00962777717358', text, (error, response) => {
        if(error) {
            throw error;
        } else if(response.messages[0].status != '0') {
            console.log( 'Nexmo returned back a non-zero status');
        } else {
            console.log('jackel jackel',response);
        }
    });
});

// sending a SMS for the user in the Job homepage
app.post('/sms', (req, res) => {      

    const number = req.body.number;
    const text = req.body.text;
    nexmo.message.sendSms(number, '00962777717358', text, (error, response) => {
        if(error) {
            throw error;
        } else if(response.messages[0].status != '0') {
            console.log( 'Nexmo returned back a non-zero status');
        } else {
            console.log(response);
        }
    });
});

//it renders all the jobs
app.get('/getServices',function (req,res){
    
    service.Service.aggregate([
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
        if(err){
		   throw err;
	   }else{
            res.send(data);
	   }
    });


});
app.get('/jobs', function(req, res){
    Jobs.allJobs(function(err, jobs){
        if(err){
            throw err;
        } else {
            res.send(jobs);
        }
    });
});
app.get('/logged', function(req, res){
    if(req.session.userName){
        res.send(true);
    }else{
        res.send(false);
    }
});
//it renders the jobs for each individual user
app.get('/userJobs', function(req, res){
    Jobs.jobByUserName({'user': req.session.userName}, function(err, job){
        if(err){
            throw err;
        } else {
            res.send(job);
        }
    });
});

app.post('/service', function(req, res){
    
    service.createService(req.session.userName, req.body, function(err, data){
        if(err){
            throw err;
        } else {
           	
            res.send(data);
        }
    });

});




app.post('/userJob', function(req, res){
    Jobs.getUserJob(req.body.jobTitle,req.body.user, function(err, user){
        if(err){
            throw err;
        } else {

            res.send(user);
        }
    });
});

//it updates the user job
app.put('/updateUserJob', function(req, res){
    Jobs.updateUserJob(req.body.jobTitle, req.body.states.user, req.body.states, function(err, user){
        if(err){
            throw err;
        } else {

            res.send(user);
        }
    });
});

app.get('/userInfo', function(req, res){
    Users.getUserInfo(req.session.userName, function(err, user){
        if(err){
            throw err;
        } else {

            res.send(user);
        }
    });
});

//it updates the user information
app.put('/updateUser', function (req, res) {
    const query = req.session.userName;
    const updatedData = req.body;
    
    Users.updateUsers(query, updatedData, function(err, users){
        if(err){
            throw err;
        } else {
            res.send(users);
        }
    });
});

//sends the user information to the database
app.post('/signup', function(req, res){
    const user = req.body;
    Users.createUsers(user, function(err, userdata){
        if(err){
            throw err;
        } else {
            res.send(userdata);
        }
    });
});

// destroys sessions when logout
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

//it checks the user information; if it already exists, it will create a session
app.post('/login', function (req, res) {
    Users.getUser(req.body.userName, req.body.password, function(err, user){
        if(err){
            res.send(err);
        } else {

            req.session.userName = user.userName;
            res.locals.login = user;
            res.locals.session = req.session;
            res.redirect('/');
        }
    });
});

//it creates a new job
app.post('/job', function(req, res){
    Jobs.createJob(req.session.userName,req.body, function(err,jobs){
        if(err){
            throw err;
        } else {

            res.send(jobs);
        }
    });
});

//it searches jobs by title
app.post('/someJobs', function (req, res) {
    Jobs.findSome(req.body.query, function(err, jobs){
        if(err){
            throw err;
        } else {
            res.send(jobs);
        }
    });
});

//it searches jobs by category
app.post('/jobCategory', function (req, res) {
    Jobs.jobsByCategory({'category':req.body.category}, function(err, job){
        if(err){
            throw err;
        } else {
            res.send(job);
        }
    });
});

//?
app.delete('/:jobTitle', function(req, res){
    Jobs.deleteJob(req.body.jobTitle, function(err, job){
        if(err){
            throw err;
        } else {
            res.send(job);
        }
    });
});



app.post('/sendMessage', (req, res) => {
    const message = new msg.Message({
        sender: req.session.userName,
        reciver: req.body.reciver,
        message: req.body.message
    });
    message.save((err, data) =>{
        if (err) {
            throw err;
        }
        else {
            res.send(data);
        }
    });
    
});



app.post('/getMessages', (req, res) => {

    let messages = [];
	
    msg.Message.find({
        reciver: req.session.userName,
        sender: req.body.client
    }, (err, data) =>{
        if (err) {
            throw err;
        }
        else {
            messages = data;
        }
    });
    msg.Message.find({
        sender: req.body.client,
        reciver: req.session.userName
    }, (err, data) =>{
        if (err) {
            throw err;
        }
        else {
            messages = messages.concat(data);
            res.send(messages);
        }
    });
});

// save the photo in the users schema and keep it upToDate
app.post('/photo',function(req,res){ 

    let image = req.body.image;
    Users.updateUsers(req.session.userName,  { image: image },function(err,data){
    		
        if(err){
            throw err;
        }else{
            res.send(data);
        }
    });

});

app.get('/getMessages',  (req, res) =>{
    msg.Message.aggregate([{$match:{$or: [{ reciver: req.session.userName }, { sender: req.session.userName }]}},
        {$lookup:
		 {
			 from: 'users',
			 localField: 'sender',
			 foreignField: 'userName',
			 as: 'senderInfo'
		 }
        }
    ], function (err, data) {
        if (err) {
            throw err;

        }
        res.send(data);
    });

});

app.get('/me', (req, res) =>{
    res.send(req.session.userName);
});

app.post('/increase', (req, res) =>{
    Jobs.Jobs.update({_id: req.body.id}, {$inc: {rate: 1}}, (err, data) =>{
        if (err) {
            throw err;
        }
        else {
            res.send(data);
        }
    });
});


app.post('/decrease', (req, res) =>{
    Jobs.Jobs.update({_id: req.body.id}, {$inc: {rate: -1}}, (err, data) =>{
        if (err) {
            throw err;
        }
        else {
            res.send(data);
        }
    });
});


app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
    console.log('listening on port ', app.get('port'));
});
