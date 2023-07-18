module.exports = {
    HOST: "129.151.239.123",
    // HOST: "129.151.233.95",
    // HOST: "129.151.239.123",*
    // HOST: "144.24.197.40",
    // HOST: "mariadb",

    USER: "root",
    PASSWORD: "x9474h7mPwSxAEZt92Nb",
    DB: "testdb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
