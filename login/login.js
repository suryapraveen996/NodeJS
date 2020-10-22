let router = require("express").Router();
var MongoClient = require("mongodb").MongoClient;
var url = process.env.DATABASE_URL;

// admin login and user login api
router.post("/loginAdmin", async (req, res) => {
  MongoClient.connect(url, function (err, db) {
    var userId = req.body.userId;
    var pass = req.body.password;
    if (err) {
      return console.dir(err);
    }
    var collection = db.collection("Login");
    collection.find().toArray(function (err, items) {
      if (items) {
        var loginData = items.filter(
          (d) => d.userId == userId && d.password == pass
        );
        if (loginData && loginData.length > 0) {
          if (
            loginData[0].userId == "admin" &&
            loginData[0].password == "@dmin124"
          ) {
            res.send("Admin Login Successfull");
          } else {
            res.send("User Login Successfull");
          }
        } else {
          res.send("Login Failed");
        }
      }
    });
  });
});

// Export API routes
module.exports = router;
