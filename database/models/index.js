const { Sequelize } = require('sequelize');

const conn = new Sequelize({
    database: 'database_blog',
    username: 'root',
    password: 'toor',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

module.exports = conn;
