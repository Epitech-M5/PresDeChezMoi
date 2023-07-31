module.exports = (sequelize, Sequelize) => {
    const Utilisateur = sequelize.define("utilisateur", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pseudo: {
            type: Sequelize.STRING,
            unique: true
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
            type: Sequelize.STRING,
            unique: true
        },
        description: {
            type: Sequelize.TEXT,
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
        likes: {
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
        nouveauUser: {
            type: Sequelize.BOOLEAN
        },
        idRole: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        listAnnonceEnregistre: {
            type: Sequelize.JSON,
            defaultValue: []
        },
        noteVille: {
            type: Sequelize.JSON,
            defaultValue: []
        }
    });

    return Utilisateur;
};