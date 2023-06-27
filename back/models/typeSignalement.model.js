module.exports = (sequelize, Sequelize) => {
    const TypeSignalement = sequelize.define("typeSignalement", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titre: {
            type: Sequelize.STRING,
            unique: true
        }
    });

    TypeSignalement.associate = (models) => {
        TypeSignalement.belongsTo(models.Utilisateur, { foreignKey: 'idUtilisateur' });
    };

    return TypeSignalement;
};