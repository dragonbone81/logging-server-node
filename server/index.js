const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const client = require("./db_connection");
const queries = require("./db_queries");
const checkJWT = require("./middleware");
app.use(morgan("short"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {
  // await client;
  // client.db.createCollection("event_log");
  // console.log(client.db("logging-app"));
  // console.log(app.locals.db);
  // app.locals.db.insertOne({"time":"sdfsdf", "type":"asdasd"});
  // const x = queries.add_log(req.app.locals.db, { "asd": "asd" });
  // const x = new Timestamp();
  res.json({ sucess: true, message: 0, input: true });
});

app.post("/add-log", checkJWT, async (req, res) => {
  console.log(
    await queries.add_log(req.app.locals.db, req.body.log, req.username)
  );
  res.json({ success: true });
});
app.post("/delete-log", checkJWT, async (req, res) => {
  await queries.delete_log(req.app.locals.db, req.body.id, req.username);
  res.json({ success: true });
});

app.get("/logs", checkJWT, async (req, res) => {
  res.json({
    logs: await queries.get_logs(req.app.locals.db, {}, req.username)
  });
});
app.post("/login", async (req, res) => {
  const token = await queries.login_user(req.app.locals.db, req.body.user);
  if (token) {
    res.json({ token });
  } else {
    res.json({ success: false });
  }
});
app.post("/register", async (req, res) => {
  const token = await queries.create_user(req.app.locals.db, req.body.user);
  if (!token) {
    res.json({ success: false });
  } else {
    res.json({ token });
  }
});
const server = app.listen(
  process.env.DB_URL === undefined ? 3001 : null,
  () => {
    console.log("Server Started!");
    app.locals.db = client;
  }
);
