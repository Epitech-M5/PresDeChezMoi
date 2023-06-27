const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.utilisateur = require("./utilisateur.model.js")(sequelize, Sequelize);
db.ville = require("./ville.model.js")(sequelize, Sequelize);
db.recompense = require("./recompense.model.js")(sequelize, Sequelize);
db.roles = require("./roles.model.js")(sequelize, Sequelize);
db.annonce = require("./annonce.model.js")(sequelize, Sequelize);
db.commentaireAdmin = require("./commentaireAdmin.model.js")(sequelize, Sequelize);
db.commentaire = require("./commentaire.model.js")(sequelize, Sequelize);
db.typeSignalement = require("./typeSignalement.model.js")(sequelize, Sequelize);
db.typeActivite = require("./typeActivite.model.js")(sequelize, Sequelize);
db.map = require("./map.model.js")(sequelize, Sequelize);
db.room = require("./room.model.js")(sequelize, Sequelize);
db.room = require("./chat.model.js")(sequelize, Sequelize);
db.ticket = require("./ticket.model.js")(sequelize, Sequelize);
db.statut = require("./statut.model.js")(sequelize, Sequelize);
db.notification = require("./notification.model.js")(sequelize, Sequelize);
db.typeUrgence = require("./typeUrgence.model.js")(sequelize, Sequelize);
db.signalement = require("./signalement.model.js")(sequelize, Sequelize);

module.exports = db;