module.exports = (sequelize, Sequelize) => {
    const Signalement = sequelize.define("signalement", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUtilisateur: {
            type: Sequelize.INTEGER
        },
        photo: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        longitude: {
            type: Sequelize.STRING
        },
        latitude: {
            type: Sequelize.STRING
        },
        graviteUrgence: {
            type: Sequelize.INTEGER
        },
        idTypeUrgence: {
            type: Sequelize.INTEGER
        },
        estTraite: {
            type: Sequelize.BOOLEAN
        },
    });

    Signalement.associate = (models) => {
        Signalement.belongsTo(models.Utilisateur, { foreignKey: 'idUtilisateur' });
        Signalement.belongsTo(models.TypeUrgence, { foreignKey: 'idTypeUrgence' });
    };

    return Signalement;
};