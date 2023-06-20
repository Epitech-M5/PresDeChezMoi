module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("room", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUtilisateur: {
            type: Sequelize.INTEGER
        }
    });

    Room.associate = (models) => {
        Room.belongsTo(models.Utilisateur, { foreignKey: 'idUtilisateur' });
    };

    return Room;
};