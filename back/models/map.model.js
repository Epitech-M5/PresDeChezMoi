module.exports = (sequelize, Sequelize) => {
    const Map = sequelize.define("map", {
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
        idUtilisateur: {
            type: Sequelize.INTEGER
        },
        parking: {
            type: Sequelize.BOOLEAN
        },
        parkingGratuit: {
            type: Sequelize.BOOLEAN
        },
        note: {
            type: Sequelize.JSON,
            defaultValue: []
        },
        moyenne: {
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
        idTypeActivite: {
            type: Sequelize.INTEGER
        }
    });

    Map.associate = (models) => {
        Map.belongsTo(models.Utilisateur, { foreignKey: 'idUtilisateur' });
        Map.belongsTo(models.TypeActivite, { foreignKey: 'idTypeActivite' });
    };

    return Map;
};