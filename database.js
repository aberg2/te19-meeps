const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    charset: 'utf8mb4',
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

})
module.exports = pool;