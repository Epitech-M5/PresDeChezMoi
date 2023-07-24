const express = require("express");
const cors = require("cors");
const app = express();
var bcrypt = require("bcryptjs");
// ('Access-Control-Allow-Origin', 'http://localhost:8081')
var corsOptions = {
    origin: '*'
};


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
// db.sequelize.sync({ force: true })
const Role = db.roles;
const Ville = db.ville;
const TypeActivite = db.typeActivite;
const TypeSignalement = db.typeSignalement;
const Annonce = db.annonce;
const Utilisateur = db.utilisateur;
const Statuses = db.status;

db.sequelize.sync({ force: true })
    .then(() => {
        console.log("Drop and re-sync db.");
        initial() // temporaire pour test
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });


// =============================================
// Création de données factices
// =============================================
function ajoutRole() {
    Role.create({ id: 1, titre: "user" });
    Role.create({ id: 2, titre: "moderator" });
    Role.create({ id: 3, titre: "admin" });
    Role.create({ id: 4, titre: "super utilisateur" });
}

function ajoutVille() {
    Ville.create({
        id: 1,
        nom: "Bourgade",
        codePostal: 12345,
        scoreVilleFleurie: 4,
        noteHygiene: [5, 5, 5, 5],
        moyenneHygiene: 5.0,
        noteService: [5, 5, 5, 5],
        moyenneService: 5.0,
        noteEvenement: [5, 5, 5, 5],
        moyenneEvenement: 5.0,
        scoreGlocale: 5.0
    })
}

function ajoutUtilisateur() {
    Utilisateur.create({
        id: 1,
        pseudo: "Administrateur",
        nom: "Admin",
        prenom: "Admin",
        photoProfil: 1,
        mail: "presdechezmoi.email@gmail.com",
        motDePasse: bcrypt.hashSync("Admin", 8),
        idVille: 1,
        score: 0,
        participation: null,
        estAdministrateur: true,
        abonnement: null,
        profession: "Administrateur",
        idRecompense: null,
        listRecompense: null,
        nombreSignalement: 0,
        estBanni: false,
        idRole: 3,
        listAnnonceEnregistre: null
    })

    Utilisateur.create({
        id: 2,
        pseudo: "robert_mla_biere",
        nom: "Dupuis",
        prenom: "Robert",
        photoProfil: 3,
        mail: "dupuis.robert@gmail.com",
        motDePasse: bcrypt.hashSync("JaDoReLaBiErE", 8),
        idVille: 1,
        score: 650,
        participation: null,
        estAdministrateur: false,
        abonnement: null,
        profession: "Barman",
        idRecompense: null,
        listRecompense: null,
        nombreSignalement: 0,
        estBanni: false,
        idRole: 1,
        listAnnonceEnregistre: null
    })

    Utilisateur.create({
        id: 3,
        pseudo: "nadine_la_sardine",
        nom: "Salvadore",
        prenom: "Nadine",
        photoProfil: 3,
        mail: "salvadore.nadine@gmail.com",
        motDePasse: bcrypt.hashSync("Sardine123", 8),
        idVille: 1,
        score: 150,
        participation: null,
        estAdministrateur: false,
        abonnement: null,
        profession: "Poissonière",
        idRecompense: null,
        listRecompense: null,
        nombreSignalement: 0,
        estBanni: false,
        idRole: 1,
        listAnnonceEnregistre: null
    })
}

function ajoutStatus() {
    Statuses.create({
        id: 1,
        titre: "non résolu",
    })
    Statuses.create({
        id: 2,
        titre: "en cours de traitement",
    })
    Statuses.create({
        id: 3,
        titre: "résolu",
    })
    Statuses.create({
        id: 4,
        titre: "inapproprié",
    })
}



function ajoutTypeActivite() {
    TypeActivite.create({
        id: 1,
        type: "Vente",
        description: "Permet la vente d'un bien"
    })
    TypeActivite.create({
        id: 2,
        type: "Poste à pourvoir",
        description: "Permet de promouvoir des postes"
    })
    TypeActivite.create({
        id: 3,
        type: "Publication",
        description: "Permet de partager une humeur, une idée, ..."
    })
    TypeActivite.create({
        id: 4,
        type: "Évènement",
        description: "Permet de créer un évènement pour la commune et ses habitants (Modérateur et Administrateur seulement)"
    })
}

function ajoutTypeSignalement() {
    TypeSignalement.create({
        id: 1,
        titre: "Contenue sexuelle"
    })
    TypeSignalement.create({
        id: 2,
        titre: "Harcelemement"
    })
    TypeSignalement.create({
        id: 3,
        titre: "Violence"
    })
    TypeSignalement.create({
        id: 4,
        titre: "Contenue inapproprié"
    })
    TypeSignalement.create({
        id: 5,
        titre: "Autre"
    })
}

function ajoutAnnonce() {
    Annonce.create({
        id: 1,
        titre: "Chasse aux oeufs",
        description: "Chasse aux oeufs dans le parc de la commune",
        image: "123.png",
        organisateur: 1,
        participants: [1, 2, 3],
        dateDebut: "2023-07-20 15:00:00",
        dateFin: "2023-07-20 18:00:00",
        estActive: true,
        reaction: 2,
        idTypeActivite: 4,
        annonceMairie: true,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 0.0,
        longitude: 5.4263808,
        latitude: 43.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: true
    })
    Annonce.create({
        id: 2,
        titre: "Vente de petits pains aux chocolats",
        description: "Encore tous chauds et sortie du four ! =)",
        image: "124.png",
        organisateur: 2,
        participants: [],
        dateDebut: "2023-07-20 08:00:00",
        dateFin: "2023-07-20 09:00:00",
        estActive: true,
        reaction: 1,
        idTypeActivite: 1,
        annonceMairie: false,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 1.0,
        longitude: 5.4263808,
        latitude: 43.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: false
    })
    Annonce.create({
        id: 3,
        titre: "Vente de petits pains aux chocolats",
        description: "Encore tous chauds et sortie du four ! =)",
        image: "124.png",
        organisateur: 2,
        participants: [],
        dateDebut: "2023-07-20 08:00:00",
        dateFin: "2023-07-20 09:00:00",
        estActive: true,
        reaction: 1,
        idTypeActivite: 1,
        annonceMairie: false,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 1.0,
        longitude: 5.4263808,
        latitude: 43.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: false
    })
    Annonce.create({
        id: 4,
        titre: "Vente de petits pains aux chocolats",
        description: "Encore tous chauds et sortie du four ! =)",
        image: "124.png",
        organisateur: 2,
        participants: [],
        dateDebut: "2023-07-20 08:00:00",
        dateFin: "2023-07-20 09:00:00",
        estActive: true,
        reaction: 1,
        idTypeActivite: 1,
        annonceMairie: false,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 1.0,
        longitude: 5.4263808,
        latitude: 43.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: false
    })
    Annonce.create({
        id: 5,
        titre: "Vente de petits pains aux chocolats",
        description: "Encore tous chauds et sortie du four ! =)",
        image: "124.png",
        organisateur: 2,
        participants: [],
        dateDebut: "2023-07-20 08:00:00",
        dateFin: "2023-07-20 09:00:00",
        estActive: true,
        reaction: 1,
        idTypeActivite: 1,
        annonceMairie: false,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 1.0,
        longitude: 5.4263808,
        latitude: 43.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: false
    })
    Annonce.create({
        id: 6,
        titre: "Vente de petits pains aux chocolats",
        description: "Encore tous chauds et sortie du four ! =)",
        image: "124.png",
        organisateur: 2,
        participants: [],
        dateDebut: "2023-07-20 08:00:00",
        dateFin: "2023-07-20 09:00:00",
        estActive: true,
        reaction: 1,
        idTypeActivite: 1,
        annonceMairie: false,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 1.0,
        longitude: 5.4263808,
        latitude: 43.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: false
    })
    Annonce.create({
        id: 7,
        titre: "Vente de petits pains aux chocolats",
        description: "Encore tous chauds et sortie du four ! =)",
        image: "124.png",
        organisateur: 2,
        participants: [],
        dateDebut: "2023-07-20 08:00:00",
        dateFin: "2023-07-20 09:00:00",
        estActive: true,
        reaction: 1,
        idTypeActivite: 1,
        annonceMairie: false,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 1.0,
        longitude: 5.4263808,
        latitude: 43.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: false
    })
}
// =============================================
// Fin de données factices
// =============================================

function initial() {
    ajoutRole() // Ajout de role
    ajoutVille() // Ajout de ville
    ajoutUtilisateur() // Ajout d'Utilisateur
    ajoutTypeActivite() // Ajout de Type d'activite
    ajoutTypeSignalement() // Ajout de Type de signalement
    ajoutAnnonce() // Ajout annonce
    ajoutStatus() // Ajout status des tickets
}

// // simple route
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to bezkoder application." });
// });

// routes
require("./routes/utilisateur.routes.js")(app);
require("./routes/roles.routes.js")(app);
require("./routes/typeUrgence.routes.js")(app);
require("./routes/typeSignalement.routes.js")(app);
require("./routes/status.routes.js")(app);
require("./routes/ville.routes.js")(app);
require("./routes/recompense.routes.js")(app);
require("./routes/ticket.routes.js")(app);
require("./routes/notification.routes.js")(app);
require("./routes/signalement.routes.js")(app);
require("./routes/commentaireAdmin.routes.js")(app);
require("./routes/annonce.routes.js")(app);
require("./routes/commentaire.routes.js")(app);
require("./routes/typeActivite.routes.js")(app);
require("./routes/map.routes.js")(app);
require("./routes/room.routes.js")(app);
require("./routes/chat.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});