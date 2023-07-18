// const db = require("../models");
// const map = db.map;

// // title: req.body.title,
// // description: req.body.description,
// // published: req.body.published ? req.body.published : false


// exports.create = (req, res) => {
//     var boolErrorFlag = false;
//     var stringErrorMessage = "";

//     // Champ nécessaire pour la requete
//     if (!req.body.titre) {
//         boolErrorFlag = true
//         stringErrorMessage = "Content can not be empty!"
//     }

//     // Validate request
//     if (boolErrorFlag) {
//         res.status(400).send({
//             message: stringErrorMessage
//         });
//         return;
//     }

//     // Create User
//     const mapObjet = {
//         titre: req.body.titre,
//         description: req.body.description,
//         image: req.body.image,
//         idUtilisateur: req.body.idUtilisateur,
//         parking: req.body.parking,
//         parkingGratuit: req.body.parkingGratuit,
//         note: null,
//         moyenne: null,
//         longitude: req.body.longitude,
//         latitude: req.body.latitude,
//         estVerifie: false,
//         idTypeActivite: req.body.idTypeActivite
//     };

//     // Save Tutorial in the database adn catch internal error
//     map.create(mapObjet)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while creating the Tutorial."
//             });
//         });
// };

// exports.find_one = (req, res) => {
//     const id = req.params.id;

//     map.findByPk(id)
//         .then(data => {
//             if (data) {
//                 res.send(data);
//             } else {
//                 res.status(404).send({
//                     message: `Cannot find map with id=${id}.`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error retrieving map with id=" + id
//             });
//         });
// };

// exports.find_all = (req, res) => {
//     map.findAll()
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving tutorials."
//             });
//         });
// };

// exports.update = (req, res) => {
//     const id = req.params.id;

//     map.update(req.body, {
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "map was updated successfully."
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot update map with id=${id}. Maybe map was not found or req.body is empty!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error updating map with id=" + id + "(" + err + ")"
//             });
//         });
// };

// exports.delete = (req, res) => {
//     const id = req.params.id;

//     map.destroy({
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "map was deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete map with id=${id}. Maybe map was not found!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete map with id=" + id
//             });
//         });
// };
