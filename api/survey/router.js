const router = require("express").Router();

const {
    newSurvey,
    getSurvey,
    updateSurvey,
    getAnswer,
    setResult,
    deleteSur
} = require("./controller");

router.patch("/", updateSurvey);
router.post("/", newSurvey);
router.post("/result", setResult);
router.get("/role/:role/id_user/:id_user/id_group/:id_group", getSurvey);
router.get("/id_survey/:id_survey", getAnswer);
router.get("/deletesur/id_survey/:id_survey", deleteSur);

module.exports = router;