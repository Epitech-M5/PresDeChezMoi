module.exports = app => {
    const roles = require("../controllers/roles.controller.js");

    var router = require("express").Router();

    router.post("/", roles.create);

    router.get("/", roles.find_all);

    router.get("/:id", roles.find_one);

    router.put("/:id", roles.update);

    router.delete("/:id", roles.delete);

    app.use('/api/roles', router);
};