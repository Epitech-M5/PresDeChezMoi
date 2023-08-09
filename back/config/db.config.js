require('dotenv').config();
const host = process.env.REACT_APP_BDD_HOST
const user = process.env.REACT_APP_BDD_USER
const password = process.env.REACT_APP_BDD_PASSWORD
const db = process.env.REACT_APP_BDD_DB

module.exports = {
    HOST: host,
    USER: user,
    PASSWORD: password,
    DB: db,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
