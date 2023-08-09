module.exports = (sequelize, Sequelize) => {
    const TypeActivite = sequelize.define("typeActivite", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        }
    });

    return TypeActivite;
};