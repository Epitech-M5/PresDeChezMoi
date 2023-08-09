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
        moyenneHygiene: {
            type: Sequelize.FLOAT
        },
        moyenneService: {
            type: Sequelize.FLOAT
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