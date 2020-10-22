let router = require("express").Router();
var MongoClient = require("mongodb").MongoClient;
var url = process.env.DATABASE_URL;

// authenticted user to check the assigned module
router.post("/userModule", async (req, res) => {
  MongoClient.connect(url, function (err, db) {
    var userId = req.body.assignedUserId;
    if (err) {
      return console.dir(err);
    }

    let newObj = {};

    var collection = db.collection("Login");
    collection.find().toArray(function (err, items) {
      if (items) {
        var userValidation = items.filter(
          (d) => d.authenticted == true && d._id == userId
        );
        if (userValidation && userValidation.length > 0) {
          var collection1 = db.collection("AssignedModule");

          collection1.findOne({ assignedUserId: userId }, function (err, doc) {
            newObj.success = "true";
            newObj.result = doc;
            res.send(newObj);
          });
        } else {
          newObj.success = "User not authenticted or not assigned a module";
          res.send(newObj);
        }
      }
    });
  });
});

// Export API routes
module.exports = router;
