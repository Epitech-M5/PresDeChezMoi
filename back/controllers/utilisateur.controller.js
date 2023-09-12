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
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
    nouveauUser: true,
    idVille: null,
    description: null,
    score: 0,
    participation: null,
    estAdministrateur: null,
    abonnement: null,
    profession: null,
    idRecompense: null,
    nombreSignalement: null,
    estBanni: null,
    idRole: 1,
    // listAnnonceEnregistre: null,
    noteVille: null // {"hygiene":5, "service":5, "evenement":5}
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
        idVille: data.idVille,
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
        return res.status(404).send({ message: "Le pseudo n'éxiste pas" });
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
          photoProfil: user.photoProfil,
          idVille: user.idVille,
          score: user.score,
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

exports.findByPseudo = (req, res) => {
  const pseudo = req.params.pseudo;

  Utilisateur.findOne({
    where: {
      pseudo: pseudo,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Le pseudo n'éxiste pas" });
      }

      res.status(200).send({
        id: user.id,
        pseudo: user.pseudo,
        score: user.score,
        photoProfil: user.photoProfil,
        idRole: user.idRole,
        // Ajoutez ici d'autres propriétés de l'utilisateur que vous souhaitez renvoyer
      });
    })
    .catch((err) => {
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
exports.get_by_id = (req, res) => {
  Utilisateur.findOne({ where: { id: req.params.id } })
    .then(data => {
      res.status(200).send({ "pseudo": data.pseudo, "description": data.description, "score": data.score, "photoProfil": data.photoProfil, "id": data.id, "likes": data.likes, "enregistrements": data.enregistrements, "listRecompense": data.listRecompense, "listRecompenseEnCoursClaim": data.listRecompenseEnCoursClaim, "idVille": data.idVille, "nom": data.nom, "prenom": data.prenom, "profession": data.profession, "email": data.mail, "estNotif": data.estNotif, "noteVille": data.noteVille });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la récupération des utilisateur."
      });
    });
};

exports.find_by_email = (req, res) => {
  const email = req.params.email; // Récupérez l'e-mail à partir des paramètres de la requête

  Utilisateur.findOne({ where: { mail: email } }) // Recherchez l'utilisateur par e-mail
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'Le mail n\'existe pas.' });
      }
      console.log("USERRRRRRRRRR", user)
      // CREATION TOKEN
      // Création du token à la connexion
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpirationMdpOublie
      });
      // Retournez les détails de l'utilisateur
      res.status(200).json({ token: token });
    })
    .catch(err => {
      res.status(500).send({
        message: "Une erreur est survenue lors de la récupération de l'utilisateur par e-mail."
      });
    });
};

exports.check_token_mdp_oublie = (req, res) => {
  console.log("check_token")
  res.status(200).send({ message: "ok" });

};

exports.get_likes = (req, res) => {
  Utilisateur.findOne({
    where: {
      id: req.userId
    }
  })
    .then(data => {
      res.status(200).send({ "likes": data.likes });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la récupération des utilisateur."
      });
    });
};
exports.get_saves = (req, res) => {
  Utilisateur.findOne({
    where: {
      id: req.userId
    }
  })
    .then(data => {
      res.status(200).send({ "enregistrements": data.enregistrements });
    })
    .catch(err => {
      console.log("@@@@")

      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la récupération des utilisateur."
      });
    });
};

// Récuperer tous les utilisateurs (Code erreur dispo: 200, 500)
exports.find_by_ville = (req, res) => {

  Utilisateur.findAll({
    include: [

      {
        model: Role,
        attributes: ['titre']
      }
    ],
    where: { idVille: req.params.idVille }
  })
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

exports.find_note_by_ville = (req, res) => {

  Utilisateur.findAll({
    include: [

      {
        model: Role,
        attributes: ['titre']
      }
    ],
    where: { idVille: req.params.idVille }
  })
    .then(data => {
      var arrayAllNote = []
      for (var n = 0; n < data.length; n++) {
        arrayAllNote.push(data[n].noteVille)
      }
      res.status(200).send(arrayAllNote);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la récupération des utilisateur."
      });
    });
};

async function userFindRole(userId) {
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
    }
  })
}

// Modification des données de l'utilisateurs (Code erreur dispo: 200, 400, 500)
exports.update = (req, res) => {
  const id = req.params.id;
  let flagValidModif = false

  if (id == req.userId) {
    flagValidModif = true
  }
  else {
    flagValidModif = userFindRole(req.userId)
  }

  // si valid
  if (flagValidModif) {
    // req.body.motDePasse = bcrypt.hashSync(req.body.motDePasse, 8)
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

exports.edit_password = (req, res) => {
  req.body.motDePasse = bcrypt.hashSync(req.body.motDePasse, 8),
    Utilisateur.update(req.body, {
      where: { id: req.userId }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            message: "L'utilisateur a été modifié avec succès."
          });
        } else {
          res.status(400).send({
            message: `Impossible de modifier l'utilisateur id=${req.userId}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur lors de la modification de l'utilisateur id=" + id + "(" + err + ")"
        });
      });
}

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

// exports.get_by_id = (req, res) => {
//   Utilisateur.findOne({ where: { id: req.params.id } })
//     .then(data => {
//       console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", data.likes)
//       res.status(200).send({ "pseudo": data.pseudo, "description": data.description, "score": data.score, "photoProfil": data.photoProfil, "id": data.id, "likes": data.likes, "enregistrements": data.enregistrements });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Une erreur est survenue lors de la récupération des utilisateur."
//       });
//     });
// };

exports.get_likes = (req, res) => {
  Utilisateur.findOne({ where: { id: req.userId } })
    .then(data => {
      res.status(200).send({ "likes": data.likes });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la récupération des utilisateur."
      });
    });
};
exports.get_saves = (req, res) => {
  Utilisateur.findOne({ where: { id: req.userId } })
    .then(data => {
      res.status(200).send({ "enregistrements": data.enregistrements });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la récupération des utilisateur."
      });
    });
};
