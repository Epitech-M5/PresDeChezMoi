module.exports = {
    HOST: "db",                     //db (nom du service) pour l'utiliser dans un container 
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