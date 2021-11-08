const mysql = require("mysql");
const { promisify } = require("util");

const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
const MYSQL_USER = process.env.MYSQL_USER || "root";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "tiendas-app";

const pool = mysql.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error(err);
        process.exit(0);
    }
    if (connection) connection.release();
    console.log("Connection to the database was successful");
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;
