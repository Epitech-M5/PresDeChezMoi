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

db.ville = require("./ville.model.js")(sequelize, Sequelize);
db.recompense = require("./recompense.model.js")(sequelize, Sequelize);
db.roles = require("./roles.model.js")(sequelize, Sequelize);
db.annonce = require("./annonce.model.js")(sequelize, Sequelize);
db.commentaireAdmin = require("./commentaireAdmin.model.js")(sequelize, Sequelize);
db.commentaire = require("./commentaire.model.js")(sequelize, Sequelize);
db.typeSignalement = require("./typeSignalement.model.js")(sequelize, Sequelize);
db.typeActivite = require("./typeActivite.model.js")(sequelize, Sequelize);
// db.map = require("./map.model.js")(sequelize, Sequelize);
db.room = require("./room.model.js")(sequelize, Sequelize);
db.chat = require("./chat.model.js")(sequelize, Sequelize);
db.ticket = require("./ticket.model.js")(sequelize, Sequelize);
db.status = require("./status.model.js")(sequelize, Sequelize);
db.notification = require("./notification.model.js")(sequelize, Sequelize);
db.typeUrgence = require("./typeUrgence.model.js")(sequelize, Sequelize);
db.signalement = require("./signalement.model.js")(sequelize, Sequelize);
db.refreshToken = require("./refreshToken.model.js")(sequelize, Sequelize);
db.utilisateur = require("./utilisateur.model.js")(sequelize, Sequelize);

// Foreign key (userId -> refreshToken(table))
db.refreshToken.belongsTo(db.utilisateur, {
    foreignKey: 'userId', targetKey: 'id'
});
db.utilisateur.hasOne(db.refreshToken, {
    foreignKey: 'userId', targetKey: 'id'
});

// Foreign key (villeId -> user(table))
db.utilisateur.belongsTo(db.ville, {
    foreignKey: 'idVille', targetKey: 'id'
});
db.ville.hasOne(db.utilisateur, {
    foreignKey: 'idVille', targetKey: 'id'
});

// Foreign key (idUtilisateur -> ticket(table))
db.ticket.belongsTo(db.utilisateur, {
    foreignKey: 'idUtilisateur', targetKey: 'id'
});
db.utilisateur.hasOne(db.ticket, {
    foreignKey: 'idTicket', targetKey: 'id'
});

// Foreign key (idStatus -> ticket(table))
db.ticket.belongsTo(db.status, {
    foreignKey: 'idStatus', targetKey: 'id'
});
db.status.hasOne(db.ticket, {
    foreignKey: 'idStatus', targetKey: 'id'
});

// Foreign key (recompenseId -> user(table))
db.utilisateur.belongsTo(db.recompense, {
    foreignKey: 'idRecompense', targetKey: 'id'
});
db.recompense.hasOne(db.utilisateur, {
    foreignKey: 'idRecompense', targetKey: 'id'
});

// Foreign key (roleId -> user(table))
db.utilisateur.belongsTo(db.roles, {
    foreignKey: 'idRole', targetKey: 'id'
});
db.roles.hasOne(db.utilisateur, {
    foreignKey: 'idRole', targetKey: 'id'
});

// Foreign key (roleId -> user(table))
db.notification.belongsTo(db.roles, {
    foreignKey: 'envoyeA', targetKey: 'id'
});
db.roles.hasOne(db.notification, {
    foreignKey: 'envoyeA', targetKey: 'id'
});
module.exports = db;