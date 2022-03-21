const router = require("express").Router();

const {
    getInfoAboutGroup,
    GetResult, 
    PostMail
} = require("./controller")

router.get("/", getInfoAboutGroup);
router.post("/", PostMail);
router.get("/result/id_survey/:id_survey", GetResult);


module.exports = router;