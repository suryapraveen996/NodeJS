let router = require("express").Router();
var MongoClient = require("mongodb").MongoClient;
var url = process.env.DATABASE_URL;

// admin assign module
router.post("/UserRegister", async (req, res) => {
  MongoClient.connect(url, function (err, db) {
    var myobj = {
      _id: req.body._id,
      userId: req.body.userId,
      password: req.body.password,
      email: req.body.email,
      name: req.body.name,
    };

    if (err) {
      return console.dir(err);
    }
    let newObj = {};

    var collection = db.collection("Login");
    collection.find().toArray(function (err, items) {
      if (items) {
        var userValidation = items.filter((d) => d.email == req.body.email);
        if (userValidation && userValidation.length == 0) {
          collection.insertOne(myobj, function (err, data) {
            if (err) {
              res.send("Error in assigning module");
            } else {
              newObj.success = "User created successfully";
              newObj.result = myobj;
              res.send(newObj);
            }
          });
        } else {
          newObj.success = "User already exists";
          newObj.result = myobj;
          res.send(newObj);
        }
      }
    });
  });
});

// Export API routes
module.exports = router;
