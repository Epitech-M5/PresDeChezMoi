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
        idStatus: {
            type: Sequelize.BOOLEAN
        },
        message: {
            type: Sequelize.TEXT
        },
        dateCreation: {
            type: Sequelize.DATE
        }
    });

    Ticket.associate = (models) => {
        Ticket.belongsTo(models.Utilisateur, { foreignKey: 'idUtilisateur' });
        Ticket.belongsTo(models.Statut, { foreignKey: 'idStatut' });
    };

    return Ticket;
};