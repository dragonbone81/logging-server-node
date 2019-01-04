module.exports.add_log = async (db, data) => {
    return (await db).insertOne(data);
}
module.exports.get_logs = async (db, filter) => {
    return (await db).find(filter).toArray();
}