module.exports = (sequelize, Sequelize) => {
    const Statut = sequelize.define("statut", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titre: {
            type: Sequelize.STRING
        }
    });

    return Statut;
};