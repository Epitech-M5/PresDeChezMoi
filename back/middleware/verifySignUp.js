const db = require("../models");
const ROLES = db.roles;
const User = db.utilisateur;

checkDuplicateUsernameOrEmail = (req, res, next) => {
   // Username
  User.findOne({
    where: {
      pseudo: req.body.pseudo
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }else{
      User.findOne({
        where: {
          mail: req.body.mail
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Échec ! L'adresse e-mail est déjà utilisée."
          });
          return;
        } else {
          next();
        }
      }).catch(err => {
        console.log(err);
        res.status(500).send({
          message: "Une erreur est survenue lors de la vérification de l'adresse e-mail."
        });
      });
    }
  })
  .catch(err => {
    console.log(err)
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.idRole) {
    for (let i = 0; i < req.body.idRole.length; i++) {
      if (!ROLES.includes(req.body.idRole[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.idRole[i]
        });
        return;
      }else {
        console.log("message", "erreur au niveau des rôles = " + req.body.idRole[i])
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;