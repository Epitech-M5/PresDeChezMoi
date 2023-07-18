const db = require("../models");
const Utilisateur = db.utilisateur;
// Pour token
const config = require("../config/auth.config"); 
const Role = db.roles;
const { refreshToken: RefreshToken } = db;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Fonction pour choisir aléatoirement un nombre
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

// Inscription (Code erreur dispo: 200, 400, 500)
exports.signup = (req, res) => {
  var boolErrorFlag = false;
  var stringErrorMessage = "";

  // Champ nécessaire pour la requete
  if (!req.body.pseudo || !req.body.mail || !req.body.motDePasse) {
    boolErrorFlag = true
    stringErrorMessage = "Pseudo, Mail ou MotDePasse n'est pas rempli !"
  }

  // Validation de la requête
  if (boolErrorFlag) {
    res.status(400).send({
      message: stringErrorMessage
    });
    return;
  }

  // Création de l'objet Utilisateur
  const utilisateurObjet = {
    pseudo: req.body.pseudo,
    nom: null,
    prenom: null,
    photoProfil: getRandomIntInclusive(1, 5), // Choisi aléatoirement une photo de profil par défaut
    mail: req.body.mail,
    motDePasse: bcrypt.hashSync(req.body.motDePasse, 8),
    idVille: null,
    score: null,
    participation: null,
    estAdministrateur: null,
    abonnement: null,
    profession: null,
    idRecompense: null,
    listRecompense: null,
    nombreSignalement: null,
    estBanni: null,
    idRole: req.body.idRole,
    listAnnonceEnregistre: null
  };

  // Enregistre l'utilisateur dans la bdd
  Utilisateur.create(utilisateurObjet)
    .then(async data => {
      // Définition du token: token = id de l'utilisateur
      const token = jwt.sign({ id: data.id }, config.secret, {
        expiresIn: config.jwtExpiration 
      });

      // Generation du refresh token
      const refreshToken = await RefreshToken.createToken(data.id);

      // Reponse en json des élèments importants pour redux et autres
      res.status(200).send({
        id: data.id,
        pseudo: data.pseudo,
        score: data.score,
        photoProfil: data.photoProfil,
        idRole: data.idRole,
        accessToken: token,
        refreshToken: refreshToken,
        photoProfil: data.photoProfil
      });
      console.log("inscription", "User was registered successfully!")
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenu lors de la création de l'utilisateur"
      });
    });
};

// Connexion (Code erreur dispo: 200, 404, 401, 500)
exports.signin = (req, res) => {
  Utilisateur.findOne({
    // Récupère le bon utilisateur grâce au pseudo
    where: {
      pseudo: req.body.pseudo
    }
  })
    .then(async user => {
      if (!user) {
        return res.status(404).send({ message: "Utilisateur non trouvé." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.motDePasse,
        user.motDePasse
      );

      // Si le mot de passe n'est pas valide alors erreur 401
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de passe invalide."
        });
      }

      // Création du token à la connexion
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration
      });

      // Création du refresh token à la connexion
      let refreshToken = await RefreshToken.createToken(user);
      // Check si l'utilisateur à un rôle
      Role.findOne({
        where: {
          id: user.idRole
        }
      }).then(roles => {
        res.status(200).send({
          id: user.id,
          pseudo: user.pseudo,
          idRole: user.idRole,
          accessToken: token,
          refreshToken: refreshToken,
        });
        console.log("user connect")
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Rafraichir le token (Code erreur dispo: 403, 200, 500)
exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  // Si aucun token n'est fournis alors erreur
  if (requestToken == null) {
    return res.status(403).json({ message: "Le refresh Token est requis!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

    if (!refreshToken) {
      console.log("Le refresh Token n'est pas dans la base de donnée");

      res.status(403).json({ message: "Le refresh token n'existe pas dans la base de données!" });
      return;
    }

    // Si le refresh token est expiré
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });
      console.log("le refresh token est expiré.");
      res.status(403).json({
        message: "Le refresh token est expiré.",
      });
      return;
    }
    //Si refreshtoken toujours valide
    const user = await refreshToken.getUtilisateur();
    //Création du nouveau token
    let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    console.log("ERRORRRRR", err);
    return res.status(500).send({ message: err });
  }
};

// Récuperer tous les utilisateurs (Code erreur dispo: 200, 500)
exports.find_all = (req, res) => {
  Utilisateur.findAll()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la récupération des utilisateur."
      });
    });
};

async function test(userId) {
  Utilisateur.findOne({
    where: {
            id: userId
    }
  }).then((user) => {
    console.log("est admin ? ", user.idRole == 3)
    if (user.idRole == 3) {
      // console.log("je passe ici")
      return true
  } else {
    return false
  }})
}

// Modification des données de l'utilisateurs (Code erreur dispo: 200, 400, 500)
exports.update = (req, res) => {
  const id = req.params.id;
  let flagValidModif = false

  if(id == req.userId){
    flagValidModif = true
  }
  else {
    flagValidModif = test(req.userId) 
  }

  // si valid
  if(flagValidModif){
    req.body.motDePasse = bcrypt.hashSync(req.body.motDePasse, 8)
    Utilisateur.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            message: "L'utilisateur a été modifié avec succès."
          });
        } else {
          res.status(400).send({
            message: `Impossible de modifier l'utilisateur id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur lors de la modification de l'utilisateur id=" + id + "(" + err + ")"
        });
      });
  }
  // Si le profil n'appartiens pas a l'utilisateur ou si pas admin alors erreur
  else {
    res.status(400).send({
      message: "Vous n'êtes pas autorisé à modifier ce profil"
    });
  }  
};


// Suppression de l'utilisateur
exports.delete = (req, res) => {
  const id = req.params.id;

  Utilisateur.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "L'utilisateur a été supprimé avec succès!"
        });
      } else {
        res.send({
          message: `Impossible de supprimer l'utilisateur avec id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimé l'utilisateur avec l'id=" + id
      });
    });
};
