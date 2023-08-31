module.exports = app => {
    const Ticket = require("../controllers/ticket.controller.js");
    const { verifySignUp } = require("../middleware");
    const { authJwt } = require("../middleware");
    
    var router = require("express").Router();

    router.post("/", [authJwt.verifyToken],Ticket.create);

    router.get("/", [authJwt.verifyToken, authJwt.isModeratorOrAdmin],Ticket.find_all);

    router.get("/:id", [authJwt.verifyToken, authJwt.isModeratorOrAdmin],Ticket.find_one);

    router.get("/by_user/:id", [authJwt.verifyToken],Ticket.find_one_by_user); 

    router.get("/status/:status", [authJwt.verifyToken, authJwt.isModeratorOrAdmin],Ticket.find_all_by_status);

    router.get("/byDate/:order", [authJwt.verifyToken, authJwt.isModeratorOrAdmin],Ticket.find_all_by_date);

    router.put("/:id", [authJwt.verifyToken, authJwt.isModeratorOrAdmin],Ticket.update);

    router.delete("/:id", Ticket.delete);

    app.use('/api/ticket', router);
};