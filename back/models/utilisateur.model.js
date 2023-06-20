module.exports = (sequelize, Sequelize) => {
    const Utilisateur = sequelize.define("utilisateur", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: Sequelize.STRING
        },
        prenom: {
            type: Sequelize.STRING
        },
        photoProfil: {
            type: Sequelize.STRING
        },
        mail: {
            type: Sequelize.STRING
        },
        motDePasse: {
            type: Sequelize.STRING
        },
        idVille: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        score: {
            type: Sequelize.INTEGER
        },
        participation: {
            type: Sequelize.JSON,
            defaultValue: []
        },
        estAdministrateur: {
            type: Sequelize.BOOLEAN
        },
        abonnement: {
            type: Sequelize.JSON,
            defaultValue: []
        },
        profession: {
            type: Sequelize.STRING
        },
        idRecompense: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        listRecompense: {
            type: Sequelize.JSON,
            defaultValue: []
        },
        nombreSignalement: {
            type: Sequelize.INTEGER
        },
        estBanni: {
            type: Sequelize.BOOLEAN
        },
        idRole: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        listAnnonceEnregistre: {
            type: Sequelize.JSON,
            defaultValue: []
        }
    });

    Utilisateur.associate = (models) => {
        Utilisateur.belongsTo(models.Ville, { foreignKey: 'idVille' });
        Utilisateur.belongsTo(models.Recompense, { foreignKey: 'idRecompense' });
        Utilisateur.belongsTo(models.Roles, { foreignKey: 'idRole' });
    };

    return Utilisateur;
};