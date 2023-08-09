module.exports = app => {
    const Notification = require("../controllers/notification.controller.js");
    const { verifySignUp } = require("../middleware");
    const { authJwt } = require("../middleware");
    
    var router = require("express").Router();

    router.post("/", [authJwt.verifyToken, authJwt.isAdmin],Notification.create);

    router.get("/", Notification.find_all);

    router.get("/:id", Notification.find_one);

    router.put("/:id", [authJwt.verifyToken],Notification.update);

    router.delete("/:id", Notification.delete);

    app.use('/api/notification', router);
};