var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  token: {type: String},
  password: {type: String},
  phoneNumber: {type: String},
  preferences: {
    breaks: {type: Number},
    mental: {type: Number},
    physical: {type: Number},
  },
  completedTasks: [
    // type: mental or physical
    {type: String, date: Date},
  ],
});

var User = module.exports = mongoose.model('User', userSchema);

// '/api/users/' in server.js
module.exports.getUsers = function(callback, limit) {
  User.find(callback).limit(limit);
};

// '/api/users/:id - http://mongoosejs.com/docs/api.html#model_Model.findById
module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

// '/api/users/:email' in server.js
module.exports.getUserByEmail = function(email, callback) {
  var specificEmail = {email: email};
  console.log('specificEmail is: ', specificEmail);
  User.findOne(specificEmail, callback);
};

// '/api/users/' in server.js
module.exports.addUser = function(userName, callback) {
  // http://mongoosejs.com/docs/models.html - create: User.create({}, callback)
  // callback in 'server.js' should be function (err, userName)
  User.create(userName, callback);
};

// ** Dummy Data Instance **/
// var marcus = new User({
//   name: 'Hello',
//   email: 'helloworld@gmail.com',
//   password: 'asdf',
//   phoneNumber: '925-666-7777',
//   preferences: {
//     breaks: 3,
//     mental: 70,
//     physical: 30,
//   },
//   completedTasks: [],
// });

// marcus.save(function(err) {
//   if (err) {
//     console.log('Could Not Save This Specific User: ', err);
//   }
// });
