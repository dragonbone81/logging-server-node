const express = require('express');
const app = express();
const client = require('./db');

app.get('/', async (req, res) => {
    // await client;
    // client.db.createCollection("event_log");
    // console.log(client.db("logging-app"));
    // console.log(app.locals.db);
    // app.locals.db.insertOne({"time":"sdfsdf", "type":"asdasd"});
    console.log(req.app.locals.db);
    res.json({ sucess: true, message: 0, input: false, url: process.env.DB_URL });
})

const server = app.listen(3000, async () => {
    console.log("Server Started!");
    app.locals.db = (await client);
});
