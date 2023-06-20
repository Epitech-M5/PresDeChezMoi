module.exports = (sequelize, Sequelize) => {
    const CommentaireAdmin = sequelize.define("commentaireAdmin", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUtilisateur: {
            type: Sequelize.INTEGER
        },
        message: {
            type: Sequelize.TEXT
        }
    });

    CommentaireAdmin.associate = (models) => {
        CommentaireAdmin.belongsTo(models.Utilisateur, { foreignKey: 'idUtilisateur' });
    };

    return CommentaireAdmin;
};