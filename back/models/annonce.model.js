module.exports = (sequelize, Sequelize) => {
    const Annonce = sequelize.define("annonce", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titre: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        image: {
            type: Sequelize.STRING
        },
        organisateur: {
            type: Sequelize.INTEGER
        },
        participants: {
            type: Sequelize.JSON,
            defaultValue: []
        },
        dateDebut: {
            type: Sequelize.DATE
        },
        dateFin: {
            type: Sequelize.DATE
        },
        estActive: {
            type: Sequelize.BOOLEAN
        },
        moyenne: {
            type: Sequelize.FLOAT
        },
        idTypeActivite: {
            type: Sequelize.INTEGER
        },
        annonceMairie: {
            type: Sequelize.BOOLEAN
        },
        idTypeSignalement: {
            type: Sequelize.INTEGER
        },
        idUtilisateurSignalement: {
            type: Sequelize.INTEGER
        },
        prix: {
            type: Sequelize.FLOAT
        }
    });

    Annonce.associate = (models) => {
        Annonce.belongsTo(models.Utilisateur, { foreignKey: 'organisateur' });
        Annonce.belongsTo(models.TypeActivite, { foreignKey: 'idTypeActivite' });
        Annonce.belongsTo(models.TypeSignalement, { foreignKey: 'idTypeSignalement' });
        Annonce.belongsTo(models.Utilisateur, { foreignKey: 'idUtilisateurSignalement' });
    };

    return Annonce;
};