var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

exports.getChampionById = function getChampionById(id) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("lol-app");
    var query = { key: id };
    dbo
      .collection("champions")
      .find(query)
      .toArray(function(err, result) {
        if (err) throw err;
        db.close();
        return result;
      });
  });
};
