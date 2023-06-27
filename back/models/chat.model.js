module.exports = (sequelize, Sequelize) => {
    const Chat = sequelize.define("chat", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idRoom: {
            type: Sequelize.INTEGER
        },
        texte: {
            type: Sequelize.TEXT
        },
        dateEnvoie: {
            type: Sequelize.INTEGER
        },
        idUtilisateur: {
            type: Sequelize.INTEGER
        }
    });

    Chat.associate = (models) => {
        Chat.belongsTo(models.Utilisateur, { foreignKey: 'idUtilisateur' });
        Chat.belongsTo(models.Room, { foreignKey: 'idRoom' });
    };

    return Chat;
};