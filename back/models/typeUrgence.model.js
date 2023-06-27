module.exports = (sequelize, Sequelize) => {
    const TypeUrgence = sequelize.define("typeUrgence", {
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

    return TypeUrgence;
};