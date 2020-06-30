"use strict";
const itemsModule = require("./getItemsDatabase");

const mongoose = require("mongoose");
const axios = require("axios");
const uri = "mongodb://localhost/lol-app";
const db = mongoose.createConnection(uri);
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  id: Number,
  name: String,
  description: String,
  plaintext: String,
  from: Array,
  into: Array,
  gold: Map,
  tags: Array,
  stat: Map,
  png: String
});

var list = [];

const Test = db.model("items", itemsSchema);

db.once("connected", async function(err) {
  if (err) {
    return console.error(err);
  }
  await itemsModule.getItems().then(async function(response) {
    for (const element in response) {
      list.push({
        id: response[element].id,
        name: response[element].name,
        description: response[element].description,
        plaintext: response[element].plaintext,
        from: response[element].from,
        into: response[element].into,
        gold: response[element].gold,
        tags: response[element].tags,
        stats: response[element].stats,
        png: response[element].png
      });
    }
  });
  Test.create(list, function(err, doc) {
    if (err) {
      return console.error(err);
    }
    //console.log(doc);
    return db.close();
  });
});
