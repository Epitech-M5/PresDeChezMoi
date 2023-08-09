module.exports = (sequelize, Sequelize) => {
    const status = sequelize.define("status", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titre: {
            type: Sequelize.STRING,
            unique: true
        }
    });

    return status;
};