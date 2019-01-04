const ObjectID = require('mongodb').ObjectID
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