"use strict";
const championsModule = require("./getChampionsDatabase");

const mongoose = require("mongoose");
const axios = require("axios");
const uri = "mongodb://localhost/lol-app";
const db = mongoose.createConnection(uri);
const Schema = mongoose.Schema;

const championsSchema = new Schema({
  version: String,
  id: String,
  key: Number,
  name: String,
  title: String,
  tags: Array,
  partype: String,
  stats: Map,
  spells: Array,
  passive: Map
});

var list = [];

const Test = db.model("champions", championsSchema);

db.once("connected", async function(err) {
  if (err) {
    return console.error(err);
  }
  await championsModule.getChampions().then(async function(response) {
    for (const element in response) {
      list.push({
        version: response[element].version,
        id: response[element].id,
        key: response[element].key,
        name: response[element].name,
        title: response[element].title,
        tags: response[element].tags,
        partype: response[element].partype,
        stats: response[element].stats,
        spells: response[element].spells,
        passive: response[element].passive
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
