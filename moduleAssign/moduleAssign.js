let router = require("express").Router();
var MongoClient = require("mongodb").MongoClient;
var url = process.env.DATABASE_URL;

// admin assign module
router.post("/moduleAssign", async (req, res) => {
  MongoClient.connect(url, function (err, db) {
    var myobj = {
      userId: req.body.userId,
      moduleName: req.body.moduleName,
      moduleId: req.body.moduleId,
      assignedUser: req.body.assignedUser,
      assignedUserId: req.body.assignedUserId,
    };

    if (err) {
      return console.dir(err);
    }
    var collection = db.collection("AssignedModule");
    collection.find().toArray(function (err, items) {
      if (items && items.length > 0) {
        var checkModule = items.filter(
          (d) => d.assignedUserId == req.body.assignedUserId
        );
        if (checkModule && checkModule.length > 0) {
          var myquery = { assignedUserId: req.body.assignedUserId };

          var newvalues = {
            $set: {
              moduleName: req.body.moduleName,
              moduleId: req.body.moduleId,
            },
          };

          collection.updateOne(myquery, newvalues, function (err, data) {
            if (!err) {
              res.send("Assigned module to the user");
            } else {
              res.send("Error in assigning module");
            }
          });
        } else {
          collection.insertOne(myobj, function (err, data) {
            if (err) {
              res.send("Error in assigning module");
            } else {
              res.send("Assigned module to the user");
            }
          });
        }
      } else {
        collection.insertOne(myobj, function (err, data) {
          if (err) {
            res.send("Error in assigning module");
          } else {
            res.send("Assigned module to the user");
          }
        });
      }
    });
  });
});


// deleting the assigned module
router.post("/deleteModule", async (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      return console.dir(err);
    }
    var collection = db.collection("AssignedModule");
    var myquery = { assignedUserId: req.body.assignedUserId };

    collection.deleteOne(myquery, function (err, items) {
      res.send("Deleted assigned module");
    });
  });
});

// Export API routes
module.exports = router;
