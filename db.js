var mysql = require('mysql');

var connectionDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
});
connectionDB.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected...");

    // Database Creation
    connectionDB.query("CREATE DATABASE IF NOT EXISTS restful_api", function (err, result) {
        if (err) throw err;
        console.log("Database created !");
    });
});

var connectionDB_new = new mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "restful_api"
});

// module.exports = connectionDB;
module.exports = connectionDB_new;
