module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define("ticket", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUtilisateur: {
            type: Sequelize.INTEGER
        },
        titre: {
            type: Sequelize.STRING
        },
        idVille: {
            type: Sequelize.INTEGER
        },
        idStatus: {
            type: Sequelize.INTEGER
        },
        message: {
            type: Sequelize.TEXT
        },
        dateCreation: {
            type: Sequelize.DATE
        },
        estRecompense: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        recompenseId: {
            type: Sequelize.INTEGER
        },
    });


    return Ticket;
};