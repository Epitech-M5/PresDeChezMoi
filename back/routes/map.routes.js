module.exports = app => {
    const map = require("../controllers/map.controller.js");
    const { authJwt } = require("../middleware");
    var router = require("express").Router();

    router.get("/", [authJwt.verifyToken], map.find_all);

    app.use('/api/map', router);
};