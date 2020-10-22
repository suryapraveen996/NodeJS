require('dotenv').config()
var express = require('express');
var app = express();
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection

db.once('open',() => console.log("connected"))
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });
app.use(express.json())
app.listen(9000, function () {
  console.log('Example app listening on port 9000!');
});

// let apiRoutes = require("./api-routes")
var login = require("./login/login");
var moduleList = require("./moduleList/moduleList");
var userRegister = require("./userRegister/userRegister");
var moduleAssign = require("./moduleAssign/moduleAssign");
var authentictedUser = require("./authentictedUser/authentictedUser");




// Use Api routes in the App
app.use('/login', login)
app.use('/moduleList', moduleList)
app.use('/userRegister', userRegister)
app.use('/moduleAssign', moduleAssign)
app.use('/authentictedUser', authentictedUser)



