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
        reaction: {
            type: Sequelize.INTEGER
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
        idVille: {
            type: Sequelize.INTEGER
        },
        idUtilisateurSignalement: {
            type: Sequelize.INTEGER
        },
        estSignale: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        prix: {
            type: Sequelize.FLOAT
        },
        longitude: {
            type: Sequelize.STRING
        },
        latitude: {
            type: Sequelize.STRING
        },
        estVerifie: {
            type: Sequelize.BOOLEAN
        },
        parking: {
            type: Sequelize.BOOLEAN
        },
        parkingGratuit: {
            type: Sequelize.BOOLEAN
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