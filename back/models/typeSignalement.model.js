module.exports = (sequelize, Sequelize) => {
    const TypeSignalement = sequelize.define("typeSignalement", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titre: {
            type: Sequelize.STRING
        }
    });

    TypeSignalement.associate = (models) => {
        TypeSignalement.belongsTo(models.Utilisateur, { foreignKey: 'idUtilisateur' });
    };

    return TypeSignalement;
};