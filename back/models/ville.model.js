module.exports = (sequelize, Sequelize) => {
    const Ville = sequelize.define("ville", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: Sequelize.STRING
        },
        codePostal: {
            type: Sequelize.INTEGER,
            unique: true
        },
        scoreVilleFleurie: {
            type: Sequelize.INTEGER
        },
        noteHygiene: {
            type: Sequelize.JSON,
            defaultValue: []
        },
        moyenneHygiene: {
            type: Sequelize.FLOAT
        },
        noteService: {
            type: Sequelize.JSON,
            defaultValue: []
        },
        moyenneService: {
            type: Sequelize.FLOAT
        },
        noteEvenement: {
            type: Sequelize.JSON,
            defaultValue: []
        },
        moyenneEvenement: {
            type: Sequelize.FLOAT
        },
        scoreGlobale: {
            type: Sequelize.FLOAT
        }
    });

    return Ville;
};