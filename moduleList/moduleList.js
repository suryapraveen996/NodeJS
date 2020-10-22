let router = require("express").Router();
var MongoClient = require("mongodb").MongoClient;
var url = process.env.DATABASE_URL;

// get the list of module
router.get("/moduleLists", async (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      return console.dir(err);
    }
    var collection = db.collection("moduleList");
    collection.find().toArray(function (err, items) {
      res.send(items);
    });
  });
});

// admin to see the module list assigned
router.get("/assignedModule", async (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      return console.dir(err);
    }
    var collection = db.collection("AssignedModule");
    collection.find().toArray(function (err, items) {
      res.send(items);
    });
  });
});
// Export API routes
module.exports = router;
