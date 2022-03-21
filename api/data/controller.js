const {
    getGroup,
    getResult,
    postMail
} = require ("./service")

module.exports = {
    getInfoAboutGroup: (req, res) => {
        getGroup((err, results) => {
            if (err){
                console.log(err);
            }
            return res.json(results);
        })
    }, 
    PostMail: (req, res) => {
        const dat = req.body.data;
        postMail(dat, (err, results) => {
            if (err){
                console.log(err);
            }
            return res.json(results);
        })
    },
    
    GetResult: (req, res) => {
        const id_survey = req.params.id_survey;
        getResult(id_survey, (err, results) => {
            if (err){
                console.log(err);
            }
            return res.json(results);
        })
    }
}