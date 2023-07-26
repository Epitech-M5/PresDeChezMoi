module.exports = {
    //HOST: "129.151.239.123",
    HOST: "127.0.0.1",
    // HOST: "129.151.233.95",
    // HOST: "129.151.239.123",*
    // HOST: "144.24.197.40",
    // HOST: "mariadb",

    USER: "root",
    PASSWORD: "",
    DB: "testdb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
