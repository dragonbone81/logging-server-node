const ObjectID = require('mongodb').ObjectID
const auth = require('./auth');
module.exports.add_log = async (db, data) => {
    return (await db).insertOne(data);
}
module.exports.get_logs = async (db, filter) => {
    const logs = await (await db).find(filter).toArray();
    logs.sort((a, b) => {
        return (new Date(a.date)).getTime() - (new Date(b.date)).getTime();
    })
    return logs;
}
module.exports.delete_log = async (db, id) => {
    return (await db).deleteOne({ _id: new ObjectID(id) });
}
module.exports.create_user = async (db, user) => {
    const hashedPW = await auth.hashPassword(user.password);
    (await db).insertOne({ username: user.username, password: hashedPW, create_at: new Date(), logs: [] })
    return auth.signJWT(user.username);
}
module.exports.login_user = async (db, user) => {
    const DBuser = await (await db).findOne({ username: user.username }, { projection: { username: true, password: true } });
    const samePassword = auth.comparePassword(user.password, DBuser.password);
    if (samePassword) {
        return auth.signJWT(user.username);
    } else {
        return false;
    }
}