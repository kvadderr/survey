const {
    createSurvey,
    createAnswer,
    getSurveyForStudent,
    getSurveyForTeacher,
    getAnswerOfSurvey,
    updateSurvey,
    deleteAnswer,
    createResult,
    deleteSurvey
} = require ("./service");

module.exports = {

    getSurvey: (req, res) => {
        const role = req.params.role;
        const id_user = req.params.id_user;
	    const id_group = req.params.id_group;
        console.log(req.body);
        //Если заправшивается инфа для студентов
        if (role == 0) {
            getSurveyForStudent (id_user, id_group, (err,results) => {
                if (err){
                    console.log(err);
                    return;
                }
                console.log(results);
                return res.status(200).json(results);   
            });
        }
        //Если заправшивается инфа для препода
        else {           
            getSurveyForTeacher (id_user, (err,results) => {
                if (err){
                    console.log(err);
                    return;
                }
                console.log(results);
                return res.status(200).json(results);   
            });
        }
    },

    getAnswer: (req, res) => {
        const id_survey = req.params.id_survey;

        getAnswerOfSurvey (id_survey, (err, results) => {
            if (err){
                console.log(err);
                return;
            }
            return res.status(200).json(results);   
        });
    },

    updateSurvey: (req, res) => {
        const body = req.body;
        deleteAnswer(body, (err, results) => {
            if (err){
                console.log(err);
                return;
            }
            
            id_survey = body.id_survey;
            answer_text = body.answer_text;

            data = "";

            answer_text.forEach(function(item, i, arr) {
                data += "("+id_survey + ",'"+item+"'),"    
            });

            createAnswer (data.slice(0, -1), (err, results) => {
                if (err){
                    console.log(err);
                    return;
                }
                return res.status(200).json({
                    data: results
                });   
            })

            
        });

        updateSurvey(body, (err, results) => {
            if (err){
                console.log(err);
                return;
            }

            return res.status(200).json({
                data: results
            }); 
        })

    },

    setResult: (req, res) => {
        const body = req.body;
        createResult(body, (err, results) => {
            if (err){
                console.log(err);
                return
            }

            return res.status(200).json({
                data: results
            })
        })
    },

    deleteSur: (req, res) => {
        const data = req.params.id_survey;
        deleteSurvey(data, (err, results) => {
            if (err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                data: results
            });  
        })
    },

    newSurvey: (req, res) => {
        const body = req.body;
        createSurvey (body, (err, results) =>{
            if (err){
                console.log(err);
                return;
            } 

            id_survey = results;
            answer_text = body.answer_text;

            data = "";
	    console.log(body);
            answer_text.forEach(function(item, i, arr) {
                data += "("+id_survey + ",'"+item+"'),"    
            });

            createAnswer (data.slice(0, -1), (err, results) => {
                if (err){
                    console.log(err);
                    return;
                }
                return res.status(200).json({
                    data: results
                });   
            })
        });
    }

}


