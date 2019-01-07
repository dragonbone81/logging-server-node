const auth = require("./auth");
const { ObjectID } = require("mongodb");
module.exports.add_log = async (db, data, username) => {
  return (await db).updateOne(
    { username },
    { $push: { logs: { ...data, _id: new ObjectID() } } }
  );
};
module.exports.get_logs = async (db, filter, username) => {
  const logs = await (await db).findOne(
    { ...filter, username },
    { projection: { logs: true } }
  );
  logs.logs.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  return logs.logs;
};
module.exports.delete_log = async (db, id, username) => {
  (await db).updateOne({ username }, { $pull: { logs: { _id: id } } });
};
module.exports.create_user = async (db, user) => {
  const DBuser = await (await db).findOne(
    { username: user.username },
    { projection: { username: true } }
  );
  if (DBuser) {
    return false;
  }
  const hashedPW = await auth.hashPassword(user.password);
  (await db).insertOne({
    username: user.username,
    password: hashedPW,
    created_at: new Date(),
    logs: []
  });
  return auth.signJWT(user.username);
};
module.exports.login_user = async (db, user) => {
  const DBuser = await (await db).findOne(
    { username: user.username },
    { projection: { username: true, password: true } }
  );
  if (!DBuser) {
    return false;
  }
  const samePassword = auth.comparePassword(user.password, DBuser.password);
  if (samePassword) {
    return auth.signJWT(user.username);
  } else {
    return false;
  }
};
