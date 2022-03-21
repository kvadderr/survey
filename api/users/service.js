const pool = require("../../config/database");
var nodemailer = require('nodemailer');

module.exports = {

    getUser: (id_user, callback) => {
        pool.query("SELECT * FROM user WHERE id_user = ?",
        [
            id_user
        ],
        (error, results, fields) => {
            if (error){
                callback(error);
            }
            return callback(null, results);
        })
    },

    userLogin: (login, pass, callback) => {
        pool.query("SELECT * FROM user WHERE phone = ? AND password = ?",
        [
            login,
            pass
        ],
        (error, results, fields) => {
            if (error){
                callback(error);
            }
            return callback(null, results);
        })
    },

    userRegister: (data, callback) => {
        pool.query("INSERT INTO user (FIO, id_group, role, email, phone, password) VALUES (?,?,?,?,?,?)",
        [
            data.FIO,
            data.id_group,
            data.role,
            data.email,
            data.phone,
            data.password
        ],
        (error, results, fields) => {
            if (error){    
                callback(error)
            }
            return callback(null, results);
        }
        )
    },

    updateUser: (data, callback) => {
        pool.query("UPDATE user set FIO = ?, id_group = ?, email = ?, phone = ? WHERE id_user = ?",
        [
            data.FIO,
            data.id_group,
            data.email,
            data.phone,
            data.id_user
        ],
        (error, results, fields) => {
            if (error){    
                callback(error)
            }
            return callback(null, results);
        }
        )
    },

    refreshPass: (mail, callback) => {
        var randomstring = Math.random().toString(36).slice(-8);
        pool.query("UPDATE user SET password = ? WHERE email = ?",
        [
            randomstring,
            mail
        ],
        (error, results, fields) => {
            if (error){
                callback(error);
            }
            return callback(null, results);
        }
        );
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'kvadder.survey@gmail.com',
              pass: 'kvadderSurvey123'
            }
          });
          console.log("mail - " + mail);
          var mailOptions = {
            from: 'kvadder.survey@gmail.com',
            to: mail,
            subject: 'Сброс пароля',
            text: 'Ваш новый пароль - ' + randomstring
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