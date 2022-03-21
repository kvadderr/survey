const pool = require("../../config/database");
var nodemailer = require('nodemailer');


module.exports = {

    //Получить названия групп
    getGroup: callback => {
        pool.query(
            "SELECT * FROM groups",
            (error, results, fields) => {
                if (error){    
                    callback(error)
                }
                return callback(null, results);
            }
        );
    }, 
    
    getResult: (id_survey, callback) => {
        pool.query(
            "SELECT * FROM resultsurvey WHERE id_survey = ?",
            [id_survey],
            (error, results, fields) => {
                if (error){    
                    callback(error)
                }
                return callback(null, results);
            }
        );
    },

    postMail: (data, callback) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'kvadder.survey@gmail.com',
              pass: 'kvadderSurvey123'
            }
          });
          
          var mailOptions = {
            from: 'kvadder.survey@gmail.com',
            to: 'kvadder.survey@gmail.com',
            subject: 'HELP',
            text: data
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }

}