const db = require("../models");
const Annonce = db.annonce;
const Signalement = db.signalement;


exports.find_all = async (req, res) => {
    var signalement = await signalementData()
    var annonce = await annonceData()
    var data = { "signalement": signalement, "annonce": annonce }
    console.log(data)
    res.status(200).send(data)
};

async function signalementData() {
    var data = await Signalement.findAll();
    // console.log(data)
    return data
}

async function annonceData() {
    var data = await Annonce.findAll();
    // console.log(data)
    return data
}