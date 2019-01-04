const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = process.env.DB_URL || "url";

// Use connect method to connect to the Server
const client = MongoClient.connect(url, { useNewUrlParser: true })
module.exports =  
    client.then((db) => {
        return db.db("logging-app").collection("logging-app");
    })
;