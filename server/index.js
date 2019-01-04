const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const client = require('./db_connection');
const queries = require('./db_queries');

app.use(morgan('short'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
    // await client;
    // client.db.createCollection("event_log");
    // console.log(client.db("logging-app"));
    // console.log(app.locals.db);
    // app.locals.db.insertOne({"time":"sdfsdf", "type":"asdasd"});
    // const x = queries.add_log(req.app.locals.db, { "asd": "asd" });
    // const x = new Timestamp();
    res.json({ sucess: true, message: 0, input: true });
})

app.post('/add-new', (req, res) => {
    queries.add_log(req.app.locals.db, req.body.log);
    res.json({ success: true });
})

app.get('/logs', async (req, res) => {
    res.json({ logs: await queries.get_logs(req.app.locals.db, {}) });
})
const server = app.listen(process.env.DB_URL === undefined ? 3000 : null, () => {
    console.log("Server Started!");
    app.locals.db = client;
});
