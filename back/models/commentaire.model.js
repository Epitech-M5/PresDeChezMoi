module.exports = (sequelize, Sequelize) => {
    const Commentaire = sequelize.define("commentaire", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUtilisateur: {
            type: Sequelize.INTEGER
        },
        idAnnonce: {
            type: Sequelize.INTEGER
        },
        note: {
            type: Sequelize.FLOAT
        },
        texte: {
            type: Sequelize.TEXT
        },
        utile: {
            type: Sequelize.INTEGER
        },
        inutile: {
            type: Sequelize.INTEGER
        }
    });

    Commentaire.associate = (models) => {
        Commentaire.belongsTo(models.Utilisateur, { foreignKey: 'idUtilisateur' });
        Commentaire.belongsTo(models.Annonce, { foreignKey: 'idAnnonce' });
    };

    return Commentaire;
};