const express = require('express');
const app = express();
const client = require('./db_connection');
const queries = require('./db_queries');
const path = require('path');

app.use(express.static(path.join(__dirname, '/../client/build')));

app.get('/home', async (req, res) => {
    // await client;
    // client.db.createCollection("event_log");
    // console.log(client.db("logging-app"));
    // console.log(app.locals.db);
    // app.locals.db.insertOne({"time":"sdfsdf", "type":"asdasd"});
    // const x = queries.add_log(req.app.locals.db, { "asd": "asd" });
    // const x = new Timestamp();
    res.json({ sucess: true, message: 0, input: false, db: process.env.DB_URL, path: __dirname });
})

app.post('/add-new', (req, res) => {
    queries.add_log(req.app.locals.db, req.body.log);
    res.json({ success: true });
})

app.get('/logs', async (req, res) => {
    res.json({ logs: await queries.get_logs(req.app.locals.db, {}) });
})
const server = app.listen(3000, () => {
    console.log("Server Started!");
    app.locals.db = client;
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'))
})