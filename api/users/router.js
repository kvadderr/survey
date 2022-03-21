const router = require("express").Router();

const {
    Auth,
    Register,
    UpdateUser,
    Refresh,
    GetUser
} = require("./controller");

router.get("/login/:login/password/:password", Auth);
router.post("/", Register);
router.patch("/", UpdateUser);
router.post("/refresh", Refresh);
router.get("/id_user/:id_user", GetUser);

module.exports = router;