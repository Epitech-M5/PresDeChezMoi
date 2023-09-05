const db = require("../models");
const Notification = db.notification;
const Role = db.roles;
const Utilisateur = db.utilisateur;

// title: req.body.title,
// description: req.body.description,
// published: req.body.published ? req.body.published : false

exports.create = (req, res) => {
  var boolErrorFlag = false;
  var stringErrorMessage = "";

  // Champ nécessaire pour la requete
  if (!req.body.titre) {
    boolErrorFlag = true;
    stringErrorMessage = "Content can not be empty!";
  }

  // Validate request
  if (boolErrorFlag) {
    res.status(400).send({
      message: stringErrorMessage,
    });
    return;
  }
  const nomRole = req.body.envoyeA;
  Role.findOne({
    where: {
      titre: nomRole,
    },
  }).then((data) => {
    if (data) {
      const idRole = data.id;
      const arrayUser = [];
      //Trouve les idutilisateur qui ont le rôle qui reçoit la notification => destinataire
      Utilisateur.findAll({
        where: {
          idRole: idRole,
        },
      }).then((data) => {
        data.forEach((user) => {
          arrayUser.push(user.id);
        });
        // Create notification
        const NotificationObjet = {
          idUtilisateur: req.userId,
          titre: req.body.titre,
          supprimer: false,
          message: req.body.message,
          dateCreation: null,
          envoyeA: idRole,
          idVille: req.body.idVille,
          typeNotif: req.body.typeNotif,
          formeNotif: req.body.formeNotif,
          destinataire: arrayUser,
        };

        Notification.create(NotificationObjet)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Tutorial.",
            });
          });
      });
    } else {
      res.status(404).send({
        message: `Cannot find Role with id=${id}.`,
      });
    }
  });
};

// trouver les notification en fonction des rôles
exports.find_one = (req, res) => {
  const idRole = req.params.id;
  console.log("idRole", idRole);
  Notification.findAll({
    where: {
      envoyeA: idRole,
    },
  })
    .then((data) => {
      console.log("NORIFICATIOOOOOOON", data);
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Role with id=${idRole}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Role with id=" + idRole,
      });
    });
};

exports.find_all = (req, res) => {
  Notification.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const idUtilisateur = req.body.idUtilisateur;
  console.log("idUtilisateur", idUtilisateur);
  console.log("id", id);

  Notification.findOne({
    where: {
      id: id,
    },
  })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Notification not found with ID=" + id });
        return;
      }

      var tabDestinataire = JSON.parse(data.destinataire);
      console.log("data.destinataire=", data.destinataire);
      console.log("ICICIICCIICICICICICICICICIIC")
      console.log(tabDestinataire[0]);

      var tabSansIdUtilisateur = [];


      // console.log("tabDestinataire", tabDestinataire);
      for (var i = 0; i < tabDestinataire.length; i++) {
        // console.log("i", i);
        // console.log(tabDestinataire[i]);

        if (tabDestinataire[i] != idUtilisateur) {
          tabSansIdUtilisateur.push(tabDestinataire[i]);
        }

      }
      console.log("TABDEST AVANT")
      console.log(tabSansIdUtilisateur);

      // Mettre à jour le champ 'destinataire' dans la base de données
      Notification.update({ destinataire: tabSansIdUtilisateur }, {
        where: {
          id: id,
        },
      })
        .then((data) => {
          console.log("Modification réussi !")
        })
        .catch((err) => {
          console.log("une erreur est survenu: ")
          console.log(err);
        })
    })
    .catch((err) => {
      console.log("ERRORORORO", err);
    });



};

exports.delete = (req, res) => {
  const id = req.params.id;

  Notification.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Role was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Role with id=${id}. Maybe Role was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Role with id=" + id,
      });
    });
};
