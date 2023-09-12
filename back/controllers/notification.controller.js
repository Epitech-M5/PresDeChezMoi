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
    stringErrorMessage = "Le contenu ne peut pas être vide !";
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
                "Une erreur est survenue lors de la création de la notification.",
            });
          });
      });
    } else {
      res.status(404).send({
        message: `Impossible de trouver le role avec id=${id}.`,
      });
    }
  });
};

// trouver les notification en fonction des rôles
exports.find_one = (req, res) => {
  const idRole = req.params.id;
  Notification.findAll({
    where: {
      envoyeA: idRole,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Impossible de trouver le role avec id=${idRole}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Une erreur est survenue lors de la récupération du role avec id=" + idRole,
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
          err.message || "Une erreur est survenue lors de la récupération des roles.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const idUtilisateur = req.body.idUtilisateur;
  Notification.findOne({
    where: {
      id: id,
    },
  })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Role non trouvé avec id=" + id });
        return;
      }

      var tabDestinataire = JSON.parse(data.destinataire);
      var tabSansIdUtilisateur = [];
      for (var i = 0; i < tabDestinataire.length; i++) {
        if (tabDestinataire[i] != idUtilisateur) {
          tabSansIdUtilisateur.push(tabDestinataire[i]);
        }
      }
      // Mettre à jour le champ 'destinataire' dans la base de données
      Notification.update({ destinataire: tabSansIdUtilisateur }, {
        where: {
          id: id,
        },
      })
        .then((data) => {
          res
            .status(200)
            .send({ message: "Modification réussi !" });
        })
        .catch((err) => {
          res
            .status(500)
            .send({ message: "une erreur est survenue lors de la modification de la notification avec id=" + id + `(${err})` });
        })
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "une erreur est survenue lors de la modification de la notification avec id=" + id + `(${err})` });
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
          message: "La notification a bien été supprimé.",
        });
      } else {
        res.send({
          message: `Impossible de supprimer la notification avec id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Impossible de supprimer la notification avec id=${id}.`,
      });
    });
};
