const { DATETIME } = require("mysql/lib/protocol/constants/types");
const pool = require("../../config/database");

module.exports = {

    //Создаем опрос
    createSurvey: (data, callback) => {
        pool.query(
            "INSERT INTO survey (title, id_group, id_creator, visible, timer) VALUES (?, ?, ?, ?, ?)",
            [
                data.title,
                data.id_group,
                data.id_creator,
                data.visible,
                data.timer
            ],
            (error, results, fields) => {
                if (error){    
                    callback(error)
                }
                return callback(null, results.insertId);
            }
        );
    },

    //Создаем вопросы к определенному опросу
    createAnswer: (data, callback) => {
        pool.query(
            "INSERT INTO answer (id_survey, text) VALUES "+data,
            (error, results, fields) => {
                if (error){    
                    callback(error)
                }
                return callback(null, results);
            }
        )
    },

    createResult: (data, callback) => {
        pool.query(
            "INSERT INTO result (id_user, id_survey, id_answer) VALUES(?,?,?)",
            [
                data.id_user,
                data.id_survey,
                data.id_answer
            ],
            (error, results, fields) => {
                if (error){
                    callback(error)
                }
                return callback(null, results);
            }
        );
    },



    //Получаем список опросов для студентов группы
    //Фильтруем запрос по параметрам: если студент уже овтечал, то не показываем
    //Если опрос невидим, то не показываем
    //Если дата уже прошла, не показываем 
    getSurveyForStudent: (id_user, id_group, callback) => {
        pool.query(
           "SELECT * FROM surveyView WHERE id_group="+id_group+" AND timer>0 AND visible = 1 AND id_survey NOT IN (SELECT id_survey FROM result WHERE id_user = "+id_user+")",
            (error, results, fields) => {
                if (error){
                    callback(error)
                }
                return callback(null,  results);
            }
        )
    },

    getSurveyForTeacher: (id_user, callback) => {
        pool.query(
            "SELECT * FROM surveyview WHERE id_creator = " + id_user + " ORDER BY  id_survey DESC ",
            (error, results, fields) => {
                if (error) callback(error);
                return callback(null, results);
            }
        )
    },

    //Получаем список ответов определенного опроса
    getAnswerOfSurvey: (id_survey,callback) => {
        pool.query(
            "SELECT * FROM answer WHERE id_survey = ?",
            [
                id_survey
            ],
            (error, results, fields) => {
                if (error){
                    callback(error)
                }
                return callback(null, results);
            }

        )
    },

    //Обновляем данные опроса и ответы к ним
    updateSurvey: (data, callback) => {
        pool.query(
            "UPDATE survey SET title = ?, id_group =?, id_creator = ?, visible = ?, timer = ? WHERE id_survey = ?",
            [
                data.title,
                data.id_group,
                data.id_creator,
                data.visible,
                data.timer,
                data.id_survey
            ], 
            (error, results, fields) => {
                 if (error){
                     callback(error)
                 }
                 return callback(null,  results);
             }
         )
    },

    deleteAnswer: (data, callback) => {
        pool.query(
            "DELETE FROM ANSWER WHERE id_survey = ?",
            [
                data.id_survey
            ], 
            (error, results, fields) => {
                 if (error){
                     callback(error)
                 }
                 return callback(null,  results);
             }
         )
    }, 

    deleteSurvey: (data, callback) => {
        pool.query(
            "DELETE FROM SURVEY WHERE id_survey  = ?",
            [data],
           (error, results, fields) => {
                if (error){
                    callback(error)
                }
                return callback(null,  results);
            }
        )
    }

}


//WHERE visible = 1 AND id_survey NOT IN (SELECT id_survey FROM result WHERE id_user = "+id_user+")
//CREATE VIEW interest AS SELECT user.id_group, COUNT(result.id_survey)*100/COUNT(user.id_group) FROM result, user WHERE result.id_user=user.id_user GROUP BY user.id_group
//CREATE VIEW CountStudentAtGroup AS SELECT user.id_group, COUNT(user.id_group) AS CountStudent FROM `user` GROUP BY user.id_group;
//SELECT user.id_group, result.id_survey, COUNT(result.id_survey) AS CountResult FROM result, user WHERE user.id_user = result.id_user GROUP BY user.id_group, result.id_survey;
//SELECT user.id_group, countstudentatgroup.CountStudent, result.id_survey, COUNT(result.id_survey) AS CountResult FROM result, user, countstudentatgroup WHERE user.id_user=result.id_user AND countstudentatgroup.id_group=user.id_group GROUP BY user.id_group, result.id_survey;
//SELECT survey.*, countresultatsurvey.CountResult / countresultatsurvey.CountStudent FROM survey LEFT OUTER JOIN countresultatsurvey ON countresultatsurvey.id_survey = survey.id_survey
            
