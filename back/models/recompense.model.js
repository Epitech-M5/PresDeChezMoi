module.exports = (sequelize, Sequelize) => {
    const Recompense = sequelize.define("recompense", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        idVille: {
            type: Sequelize.INTEGER
        }
    });

    Recompense.associate = (models) => {
        Recompense.belongsTo(models.Ville, { foreignKey: 'idVille' });
    };

    return Recompense;
};