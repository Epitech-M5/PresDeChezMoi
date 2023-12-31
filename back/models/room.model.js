module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("room", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        membres: {
            type: Sequelize.JSON,
            defaultValue: []
        },
        idVille: {
            type: Sequelize.INTEGER
        }
    });

    return Room;
};