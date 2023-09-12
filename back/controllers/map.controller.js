const db = require("../models");
const Annonce = db.annonce;
const Signalement = db.signalement;


exports.find_all = async (req, res) => {
    var signalement = await signalementData()
    var annonce = await annonceData()
    var data = { "signalement": signalement, "annonce": annonce }
    res.status(200).send(data)
};

async function signalementData() {
    var data = await Signalement.findAll();
    return data
}

async function annonceData() {
    var data = await Annonce.findAll();
    return data
}