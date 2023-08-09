module.exports = app => {
    const typeSignalement = require("../controllers/typeSignalement.controller.js");

    var router = require("express").Router();

    router.post("/", typeSignalement.create);

    router.get("/", typeSignalement.find_all);

    router.get("/:id", typeSignalement.find_one);

    router.put("/:id", typeSignalement.update);

    router.delete("/:id", typeSignalement.delete);

    app.use('/api/typeSignalement', router);
};