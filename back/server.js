const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const app = express();
var bcrypt = require("bcryptjs");
require('dotenv').config();
const port = process.env.REACT_APP_BACKEND_PORT
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
const Role = db.roles;
const Ville = db.ville;
const TypeActivite = db.typeActivite;
const TypeSignalement = db.typeSignalement;
const Annonce = db.annonce;
const Utilisateur = db.utilisateur;
const Statuses = db.status;

// db.sequelize.sync({ force: true })
//     .then(() => {
//         console.log("Drop and re-sync db.");
//         initial() // temporaire pour test
//     })
//     .catch((err) => {
//         console.log("Failed to sync db: " + err.message);
//     });


// =============================================
// Création de données factices
// =============================================
function ajoutRole() {
    Role.create({ id: 1, titre: "Utilisateur" });
    Role.create({ id: 2, titre: "Modérateur" });
    Role.create({ id: 3, titre: "Admin" });
    Role.create({ id: 4, titre: "Super Administrateur" });
}

function ajoutVille() {
    Ville.create({
        id: 1,
        nom: "Gardanne",
        codePostal: 13120,
        scoreVilleFleurie: 4,
        noteHygiene: [5, 5, 5, 5],
        moyenneHygiene: 5.0,
        noteService: [5, 5, 5, 5],
        moyenneService: 5.0,
        noteEvenement: [5, 5, 5, 5],
        moyenneEvenement: 5.0,
        scoreGlobale: 0.0
    })

    Ville.create({
        id: 2,
        nom: "Peypin",
        codePostal: 13124,
        scoreVilleFleurie: 3,
        noteHygiene: [5, 5, 5, 5],
        moyenneHygiene: 5.0,
        noteService: [5, 5, 5, 5],
        moyenneService: 5.0,
        noteEvenement: [5, 5, 5, 5],
        moyenneEvenement: 5.0,
        scoreGlobale: 0.0
    })

    Ville.create({
        id: 3,
        nom: "Cadolive",
        codePostal: 13950,
        scoreVilleFleurie: 5,
        noteHygiene: [5, 5, 5, 5],
        moyenneHygiene: 5.0,
        noteService: [5, 5, 5, 5],
        moyenneService: 5.0,
        noteEvenement: [5, 5, 5, 5],
        moyenneEvenement: 5.0,
        scoreGlobale: 0.0
    })
}

function ajoutUtilisateur() {

    Utilisateur.create({
        id: 1,
        pseudo: "Administrateur-Gardanne",
        nom: "Jean",
        prenom: "Ane",
        photoProfil: 1,
        mail: "presdechezmoi.gardanne@gmail.com",
        motDePasse: bcrypt.hashSync("Admin", 8),
        description: "Bonjour, je suis l'administrateur de la ville de Gardanne",
        nouveauUser: false,
        idVille: 1,
        score: 3000,
        participation: null,
        estAdministrateur: true,
        abonnement: null,
        profession: "Administrateur",
        nombreSignalement: 0,
        estBanni: false,
        idRole: 3,
    })

    Utilisateur.create({
        id: 2,
        pseudo: "Administrateur-Peypin",
        nom: "Jean",
        prenom: "Pain",
        photoProfil: 2,
        mail: "presdechezmoi.peypin@gmail.com",
        motDePasse: bcrypt.hashSync("Admin", 8),
        description: "Bonjour, je suis l'administrateur de la ville de Peypin",
        nouveauUser: false,
        idVille: 2,
        score: 3000,
        participation: null,
        estAdministrateur: true,
        abonnement: null,
        profession: "Administrateur",
        nombreSignalement: 0,
        estBanni: false,
        idRole: 3,
    })

    Utilisateur.create({
        id: 3,
        pseudo: "Administrateur-Cadolive",
        nom: "Jean",
        prenom: "Olive",
        photoProfil: 3,
        mail: "presdechezmoi.cadolive@gmail.com",
        motDePasse: bcrypt.hashSync("Admin", 8),
        description: "Bonjour, je suis l'administrateur de la ville de Cadolive",
        nouveauUser: false,
        idVille: 3,
        score: 3000,
        participation: null,
        estAdministrateur: true,
        abonnement: null,
        profession: "Administrateur",
        nombreSignalement: 0,
        estBanni: false,
        idRole: 3,
    })

    Utilisateur.create({
        id: 4,
        pseudo: "Moderateur-Gardanne",
        nom: "Jean",
        prenom: "Garou",
        photoProfil: 4,
        mail: "modo-gardanne@gmail.com",
        motDePasse: bcrypt.hashSync("Modo", 8),
        description: "Bonjour, je suis un modérateur de la ville de Gardanne",
        nouveauUser: false,
        idVille: 1,
        score: 1200,
        participation: null,
        estAdministrateur: false,
        abonnement: null,
        profession: "Modérateur",
        nombreSignalement: 0,
        estBanni: false,
        idRole: 2,
    })

    Utilisateur.create({
        id: 5,
        pseudo: "Moderateur-Peypin",
        nom: "Jean",
        prenom: "Abricot",
        photoProfil: 5,
        mail: "modo-peypin@gmail.com",
        motDePasse: bcrypt.hashSync("Modo", 8),
        description: "Bonjour, je suis un modérateur de la ville de Peypin",
        nouveauUser: false,
        idVille: 2,
        score: 1200,
        participation: null,
        estAdministrateur: false,
        abonnement: null,
        profession: "Modérateur",
        nombreSignalement: 0,
        estBanni: false,
        idRole: 2,
    })

    Utilisateur.create({
        id: 6,
        pseudo: "Moderateur-Cadolive",
        nom: "Jean",
        prenom: "Avocat",
        photoProfil: 1,
        mail: "modo-cadolive@gmail.com",
        motDePasse: bcrypt.hashSync("Modo", 8),
        description: "Bonjour, je suis un modérateur de la ville de Cadolive",
        nouveauUser: false,
        idVille: 3,
        score: 1200,
        participation: null,
        estAdministrateur: false,
        abonnement: null,
        profession: "Modérateur",
        nombreSignalement: 0,
        estBanni: false,
        idRole: 2,
    })

    Utilisateur.create({
        id: 7,
        pseudo: "Utilisateur-Gardanne-1",
        nom: "Jean",
        prenom: "Xavier",
        photoProfil: 2,
        mail: "user1-gardanne@gmail.com",
        motDePasse: bcrypt.hashSync("User", 8),
        description: "Bonjour, je suis un simple utilisateur de la ville de Gardanne",
        nouveauUser: false,
        idVille: 1,
        score: 100,
        participation: null,
        estAdministrateur: false,
        abonnement: null,
        profession: "Plombier",
        nombreSignalement: 0,
        estBanni: false,
        idRole: 1,
    })

    Utilisateur.create({
        id: 8,
        pseudo: "Utilisateur-Gardanne-2",
        nom: "Jean",
        prenom: "Evian",
        photoProfil: 3,
        mail: "user2-gardanne@gmail.com",
        motDePasse: bcrypt.hashSync("User", 8),
        description: "Bonjour, je suis un simple utilisateur de la ville de Gardanne",
        nouveauUser: false,
        idVille: 1,
        score: 1200,
        participation: null,
        estAdministrateur: false,
        abonnement: null,
        profession: "Boulanger",
        nombreSignalement: 0,
        estBanni: false,
        idRole: 1,
    })

    Utilisateur.create({
        id: 9,
        pseudo: "Utilisateur-Peypin-1",
        nom: "Jean",
        prenom: "Pain",
        photoProfil: 4,
        mail: "user1-peypin@gmail.com",
        motDePasse: bcrypt.hashSync("User", 8),
        description: "Bonjour, je suis un simple utilisateur de la ville de Peypin",
        nouveauUser: false,
        idVille: 2,
        score: 100,
        participation: null,
        estAdministrateur: false,
        abonnement: null,
        profession: "Charcutier",
        nombreSignalement: 0,
        estBanni: false,
        idRole: 1,
    })

    Utilisateur.create({
        id: 10,
        pseudo: "Utilisateur-Peypin-2",
        nom: "Jean",
        prenom: "Stylo",
        photoProfil: 5,
        mail: "user2-peypin@gmail.com",
        motDePasse: bcrypt.hashSync("User", 8),
        description: "Bonjour, je suis un simple utilisateur de la ville de Peypin",
        nouveauUser: false,
        idVille: 2,
        score: 100,
        participation: null,
        estAdministrateur: false,
        abonnement: null,
        profession: "Vendeur",
        nombreSignalement: 0,
        estBanni: false,
        idRole: 1,
    })

    Utilisateur.create({
        id: 11,
        pseudo: "Utilisateur-Cadolive-1",
        nom: "Jean",
        prenom: "Phone",
        photoProfil: 1,
        mail: "user1-cadolive@gmail.com",
        motDePasse: bcrypt.hashSync("User", 8),
        description: "Bonjour, je suis un simple utilisateur de la ville de Cadolive",
        nouveauUser: false,
        idVille: 3,
        score: 1200,
        participation: null,
        estAdministrateur: false,
        abonnement: null,
        profession: "Dentist",
        nombreSignalement: 0,
        estBanni: false,
        idRole: 1,
    })

    Utilisateur.create({
        id: 12,
        pseudo: "Utilisateur-Cadolive-2",
        nom: "Jean",
        prenom: "Montre",
        photoProfil: 2,
        mail: "user2-cadolive@gmail.com",
        motDePasse: bcrypt.hashSync("User", 8),
        description: "Bonjour, je suis un simple utilisateur de la ville de Cadolive",
        nouveauUser: false,
        idVille: 3,
        score: 100,
        participation: null,
        estAdministrateur: false,
        abonnement: null,
        profession: "Footballeur",
        nombreSignalement: 0,
        estBanni: false,
        idRole: 1,
    })

    Utilisateur.create({
        id: 13,
        pseudo: "SuperAdmin",
        nom: "Jean",
        prenom: "Master",
        photoProfil: 3,
        mail: "presdechezmoi@gmail.com",
        motDePasse: bcrypt.hashSync("superAdmin", 8),
        description: "Bonjour, je suis super admin",
        nouveauUser: false,
        idVille: 1,
        score: 9999999,
        participation: null,
        estAdministrateur: false,
        abonnement: null,
        profession: "Admin",
        nombreSignalement: 0,
        estBanni: false,
        idRole: 4,
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
    // TypeActivite.create({
    //     id: 1,
    //     type: "Vente",
    //     description: "Permet la vente d'un bien"
    // })
    // TypeActivite.create({
    //     id: 2,
    //     type: "Poste à pourvoir",
    //     description: "Permet de promouvoir des postes"
    // })
    // TypeActivite.create({
    //     id: 3,
    //     type: "Publication",
    //     description: "Permet de partager une humeur, une idée, ..."
    // })
    // TypeActivite.create({
    //     id: 4,
    //     type: "Évènement",
    //     description: "Permet de créer un évènement pour la commune et ses habitants (Modérateur et Administrateur seulement)"
    // })
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
        titre: "Il y a eu un accident de voiture dans le centre, attention",
        description: "",
        image: "124.png",
        organisateur: 7,
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
        parkingGratuit: false,
        idVille: 1
    })

    Annonce.create({
        id: 2,
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
        parkingGratuit: true,
        idVille: 1
    })
    Annonce.create({
        id: 3,
        titre: "Vend Macbook",
        description: "Je vends un macbook que j'ai trouvé sur le bureau d'un ami, il est en très bon état, prix ferme",
        image: "124.png",
        organisateur: 8,
        participants: [],
        dateDebut: "2023-07-31 08:00:00",
        dateFin: "2023-08-28 09:00:00",
        estActive: true,
        reaction: 928,
        idTypeActivite: 5,
        annonceMairie: false,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 1200.0,
        longitude: 5.4263808,
        latitude: 41.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: false,
        idVille: 1
    })

    Annonce.create({
        id: 4,
        titre: "Il y a eu un accident de voiture dans le centre, attention",
        description: "Encore tous chauds et sortie du four ! =)",
        image: "124.png",
        organisateur: 8,
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
        parkingGratuit: false,
        idVille: 1
    })

    Annonce.create({
        id: 5,
        titre: "Recherche étudiant pour alternance",
        description: "Bonjour, suite à une évolution de notre IHM, nous réalison une migration vers Angular et nous avons besoin d'une personne qualifié !",
        image: "124.png",
        organisateur: 4,
        participants: [],
        dateDebut: null,
        dateFin: null,
        estActive: true,
        reaction: 78,
        idTypeActivite: 3,
        annonceMairie: false,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 800.0,
        longitude: null,
        latitude: null,
        estVerifie: true,
        parking: true,
        parkingGratuit: false,
        idVille: 1
    })

    Annonce.create({
        id: 6,
        titre: "Il y a eu un accident de voiture dans le centre, attention",
        description: "Encore tous chauds et sortie du four ! =)",
        image: "124.png",
        organisateur: 7,
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
        parkingGratuit: false,
        idVille: 1
    })
    Annonce.create({
        id: 7,
        titre: "-50% sur les fruits et légumes",
        description: "Venez nombreux, il y en a pour tous le monde !",
        image: "124.png",
        organisateur: 8,
        participants: [],
        dateDebut: "2023-07-20 08:00:00",
        dateFin: "2023-07-20 09:00:00",
        estActive: true,
        reaction: 1,
        idTypeActivite: 2,
        annonceMairie: false,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 1.0,
        longitude: 5.4263808,
        latitude: 43.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: false,
        idVille: 1
    })
    Annonce.create({
        id: 8,
        titre: "Il y a eu un accident de voiture dans le centre, attention",
        description: "Encore tous chauds et sortie du four ! =)",
        image: "124.png",
        organisateur: 1,
        participants: [],
        dateDebut: "2023-07-20 08:00:00",
        dateFin: "2023-07-20 09:00:00",
        estActive: true,
        reaction: 1,
        idTypeActivite: 1,
        annonceMairie: true,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 1.0,
        longitude: 5.4263808,
        latitude: 43.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: false,
        idVille: 1
    })

    Annonce.create({
        id: 9,
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
        parkingGratuit: true,
        idVille: 1
    })
    Annonce.create({
        id: 10,
        titre: "Vend Macbook",
        description: "Je vends un macbook que j'ai trouvé sur le bureau d'un ami, il est en très bon état, prix ferme",
        image: "124.png",
        organisateur: 4,
        participants: [],
        dateDebut: "2023-07-31 08:00:00",
        dateFin: "2023-08-28 09:00:00",
        estActive: true,
        reaction: 928,
        idTypeActivite: 5,
        annonceMairie: false,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 1200.0,
        longitude: 5.4263808,
        latitude: 41.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: false,
        idVille: 1
    })

    Annonce.create({
        id: 11,
        titre: "Il y a eu un accident de voiture dans le centre, attention",
        description: "",
        image: "124.png",
        organisateur: 2,
        participants: [],
        dateDebut: "2023-07-20 08:00:00",
        dateFin: "2023-07-20 09:00:00",
        estActive: true,
        reaction: 1,
        idTypeActivite: 1,
        annonceMairie: true,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 1.0,
        longitude: 5.4263808,
        latitude: 43.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: false,
        idVille: 2
    })

    Annonce.create({
        id: 12,
        titre: "Chasse aux oeufs",
        description: "Chasse aux oeufs dans le parc de la commune",
        image: "123.png",
        organisateur: 2,
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
        parkingGratuit: true,
        idVille: 2
    })
    Annonce.create({
        id: 13,
        titre: "Vend Macbook",
        description: "Je vends un macbook que j'ai trouvé sur le bureau d'un ami, il est en très bon état, prix ferme",
        image: "124.png",
        organisateur: 5,
        participants: [],
        dateDebut: "2023-07-31 08:00:00",
        dateFin: "2023-08-28 09:00:00",
        estActive: true,
        reaction: 928,
        idTypeActivite: 5,
        annonceMairie: false,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 1200.0,
        longitude: 5.4263808,
        latitude: 41.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: false,
        idVille: 2
    })

    Annonce.create({
        id: 14,
        titre: "Il y a eu un accident de voiture dans le centre, attention",
        description: "Encore tous chauds et sortie du four ! =)",
        image: "124.png",
        organisateur: 9,
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
        parkingGratuit: false,
        idVille: 2
    })

    Annonce.create({
        id: 15,
        titre: "Recherche étudiant pour alternance",
        description: "Bonjour, suite à une évolution de notre IHM, nous réalison une migration vers Angular et nous avons besoin d'une personne qualifié !",
        image: "124.png",
        organisateur: 10,
        participants: [],
        dateDebut: null,
        dateFin: null,
        estActive: true,
        reaction: 78,
        idTypeActivite: 3,
        annonceMairie: false,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 800.0,
        longitude: null,
        latitude: null,
        estVerifie: true,
        parking: true,
        parkingGratuit: false,
        idVille: 2
    })

    Annonce.create({
        id: 16,
        titre: "Il y a eu un accident de voiture dans le centre, attention",
        description: "Encore tous chauds et sortie du four ! =)",
        image: "124.png",
        organisateur: 2,
        participants: [],
        dateDebut: "2023-07-20 08:00:00",
        dateFin: "2023-07-20 09:00:00",
        estActive: true,
        reaction: 1,
        idTypeActivite: 1,
        annonceMairie: true,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 1.0,
        longitude: 5.4263808,
        latitude: 43.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: false,
        idVille: 2
    })
    Annonce.create({
        id: 17,
        titre: "-50% sur les fruits et légumes",
        description: "Venez nombreux, il y en a pour tous le monde !",
        image: "124.png",
        organisateur: 10,
        participants: [],
        dateDebut: "2023-07-20 08:00:00",
        dateFin: "2023-07-20 09:00:00",
        estActive: true,
        reaction: 1,
        idTypeActivite: 2,
        annonceMairie: false,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 1.0,
        longitude: 5.4263808,
        latitude: 43.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: false,
        idVille: 2
    })
    Annonce.create({
        id: 18,
        titre: "Il y a eu un accident de voiture dans le centre, attention",
        description: "Encore tous chauds et sortie du four ! =)",
        image: "124.png",
        organisateur: 5,
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
        parkingGratuit: false,
        idVille: 2
    })

    Annonce.create({
        id: 19,
        titre: "Chasse aux oeufs",
        description: "Chasse aux oeufs dans le parc de la commune",
        image: "123.png",
        organisateur: 9,
        participants: [1, 2, 3],
        dateDebut: "2023-07-20 15:00:00",
        dateFin: "2023-07-20 18:00:00",
        estActive: true,
        reaction: 2,
        idTypeActivite: 4,
        annonceMairie: false,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 0.0,
        longitude: 5.4263808,
        latitude: 43.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: true,
        idVille: 2
    })
    Annonce.create({
        id: 20,
        titre: "Vend Macbook",
        description: "Je vends un macbook que j'ai trouvé sur le bureau d'un ami, il est en très bon état, prix ferme",
        image: "124.png",
        organisateur: 10,
        participants: [],
        dateDebut: "2023-07-31 08:00:00",
        dateFin: "2023-08-28 09:00:00",
        estActive: true,
        reaction: 928,
        idTypeActivite: 5,
        annonceMairie: false,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 1200.0,
        longitude: 5.4263808,
        latitude: 41.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: false,
        idVille: 2
    })

    Annonce.create({
        id: 21,
        titre: "Il y a eu un accident de voiture dans le centre, attention",
        description: "",
        image: "124.png",
        organisateur: 3,
        participants: [],
        dateDebut: "2023-07-20 08:00:00",
        dateFin: "2023-07-20 09:00:00",
        estActive: true,
        reaction: 1,
        idTypeActivite: 1,
        annonceMairie: true,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 1.0,
        longitude: 5.4263808,
        latitude: 43.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: false,
        idVille: 3
    })

    Annonce.create({
        id: 22,
        titre: "Chasse aux oeufs",
        description: "Chasse aux oeufs dans le parc de la commune",
        image: "123.png",
        organisateur: 3,
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
        parkingGratuit: true,
        idVille: 3
    })
    Annonce.create({
        id: 23,
        titre: "Vend Macbook",
        description: "Je vends un macbook que j'ai trouvé sur le bureau d'un ami, il est en très bon état, prix ferme",
        image: "124.png",
        organisateur: 12,
        participants: [],
        dateDebut: "2023-07-31 08:00:00",
        dateFin: "2023-08-28 09:00:00",
        estActive: true,
        reaction: 928,
        idTypeActivite: 5,
        annonceMairie: false,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 1200.0,
        longitude: 5.4263808,
        latitude: 41.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: false,
        idVille: 3
    })

    Annonce.create({
        id: 24,
        titre: "Il y a eu un accident de voiture dans le centre, attention",
        description: "Encore tous chauds et sortie du four ! =)",
        image: "124.png",
        organisateur: 6,
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
        parkingGratuit: false,
        idVille: 3
    })

    Annonce.create({
        id: 25,
        titre: "Recherche étudiant pour alternance",
        description: "Bonjour, suite à une évolution de notre IHM, nous réalison une migration vers Angular et nous avons besoin d'une personne qualifié !",
        image: "124.png",
        organisateur: 11,
        participants: [],
        dateDebut: null,
        dateFin: null,
        estActive: true,
        reaction: 78,
        idTypeActivite: 3,
        annonceMairie: false,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 800.0,
        longitude: null,
        latitude: null,
        estVerifie: true,
        parking: true,
        parkingGratuit: false,
        idVille: 3
    })

    Annonce.create({
        id: 26,
        titre: "Il y a eu un accident de voiture dans le centre, attention",
        description: "Encore tous chauds et sortie du four ! =)",
        image: "124.png",
        organisateur: 12,
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
        parkingGratuit: false,
        idVille: 3
    })
    Annonce.create({
        id: 27,
        titre: "-50% sur les fruits et légumes",
        description: "Venez nombreux, il y en a pour tous le monde !",
        image: "124.png",
        organisateur: 3,
        participants: [],
        dateDebut: "2023-07-20 08:00:00",
        dateFin: "2023-07-20 09:00:00",
        estActive: true,
        reaction: 1,
        idTypeActivite: 2,
        annonceMairie: true,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 1.0,
        longitude: 5.4263808,
        latitude: 43.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: false,
        idVille: 3
    })
    Annonce.create({
        id: 28,
        titre: "Il y a eu un accident de voiture dans le centre, attention",
        description: "Encore tous chauds et sortie du four ! =)",
        image: "124.png",
        organisateur: 12,
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
        parkingGratuit: false,
        idVille: 3
    })

    Annonce.create({
        id: 29,
        titre: "Chasse aux oeufs",
        description: "Chasse aux oeufs dans le parc de la commune",
        image: "123.png",
        organisateur: 6,
        participants: [1, 2, 3],
        dateDebut: "2023-07-20 15:00:00",
        dateFin: "2023-07-20 18:00:00",
        estActive: true,
        reaction: 2,
        idTypeActivite: 4,
        annonceMairie: false,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 0.0,
        longitude: 5.4263808,
        latitude: 43.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: true,
        idVille: 3
    })
    Annonce.create({
        id: 30,
        titre: "Vend Macbook",
        description: "Je vends un macbook que j'ai trouvé sur le bureau d'un ami, il est en très bon état, prix ferme",
        image: "124.png",
        organisateur: 11,
        participants: [],
        dateDebut: "2023-07-31 08:00:00",
        dateFin: "2023-08-28 09:00:00",
        estActive: true,
        reaction: 928,
        idTypeActivite: 5,
        annonceMairie: false,
        idTypeSignalement: null,
        idUtilisateurSignalement: null,
        prix: 1200.0,
        longitude: 5.4263808,
        latitude: 41.3455104,
        estVerifie: true,
        parking: true,
        parkingGratuit: false,
        idVille: 3
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
require("./routes/annonce.routes.js")(app);
require("./routes/typeActivite.routes.js")(app);
require("./routes/map.routes.js")(app);
require("./routes/room.routes.js")(app);
require("./routes/chat.routes.js")(app);
require("./messages/chat")(app);

app.use(fileUpload());


app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('Aucun fichier n\'a été téléchargé.');
    }

    const uploadedFile = req.files.uploadedFile;
    const newFileName = `${req.body.newName}.jpg`; // Nouveau nom de fichier
    const filePath = path.join(__dirname, '../front/public/recompense', newFileName);

    uploadedFile.mv(filePath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.send('Fichier téléchargé avec succès et renommé !');
    });
});
// set port, listen for requests
const PORT = port || 8082;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});