const db = require("../models");
const Ville = db.ville;

// Ajouter une ville => Pour super administrateur
exports.create = (req, res) => {
  var boolErrorFlag = false;
  var stringErrorMessage = "";

  // Champ nécessaire pour la requete
  if (!req.body.nom || !req.body.codePostal || !req.body.scoreVilleFleurie) {
    boolErrorFlag = true;
    stringErrorMessage = "Les champs ne peuvent pas être vide!";
  }

  // Validation de la requête
  if (boolErrorFlag) {
    res.status(400).send({
      message: stringErrorMessage,
    });
    return;
  }

  // Objet ville
  const VilleObjet = {
    nom: req.body.nom,
    codePostal: req.body.codePostal,
    scoreVilleFleurie: req.body.scoreVilleFleurie,
    moyenneHygiene: null,
    moyenneService: null,
    moyenneEvenement: null,
    scoreGlocale: null,
  };

  // sauvegarde de la ville dans la base de données
  Ville.create(VilleObjet)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Impossible de créer la ville.",
      });
    });
};

// Trouver une ville
exports.find_one = (req, res) => {
  const id = req.params.id;

  Ville.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Impossible de trouver la ville avec id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Impossible de trouver la ville avec id=" + id,
      });
    });
};

exports.find_all = (req, res) => {
  Ville.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur est survenu lors de la récupération des villes.",
      });
    });
};

// Modifier une ville
exports.update = (req, res) => {
  const id = req.params.id;

  Ville.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "La ville a été modifier avec succès.",
        });
      } else {
        res.send({
          message: `Impossible de modifier la ville avec id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Impossible de modifier la ville avec id=" + id + "(" + err + ")",
      });
    });
};

// Suppression d'une ville
exports.delete = (req, res) => {
  const id = req.params.id;

  Ville.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "La ville a été supprimé avec succès!",
        });
      } else {
        res.send({
          message: `Impossible de supprimer la ville avec id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Impossible de supprimer la ville avec id=" + id,
      });
    });
};
