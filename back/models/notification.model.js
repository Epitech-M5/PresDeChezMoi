module.exports = (sequelize, Sequelize) => {
  const Notification = sequelize.define("notification", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUtilisateur: {
      type: Sequelize.INTEGER,
    },
    titre: {
      type: Sequelize.STRING,
    },
    supprimer: {
      type: Sequelize.BOOLEAN,
    },
    message: {
      type: Sequelize.TEXT,
    },

    typeNotif: {
      type: Sequelize.STRING,
    },
    formeNotif: {
      type: Sequelize.STRING,
    },
    dateCreation: {
      type: Sequelize.DATE,
    },
    // idRole qui ont reçu la notification
    envoyeA: {
      type: Sequelize.INTEGER,
    },
  });

  Notification.associate = (models) => {
    Notification.belongsTo(models.Utilisateur, { foreignKey: "idUtilisateur" });
  };

  return Notification;
};
