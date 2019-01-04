const ObjectID = require('mongodb').ObjectID
module.exports.add_log = async (db, data) => {
    return (await db).insertOne(data);
}
module.exports.get_logs = async (db, filter) => {
    return (await db).find(filter).toArray();
}
module.exports.delete_log = async (db, id) => {
    return (await db).deleteOne({ _id: new ObjectID(id) });
}