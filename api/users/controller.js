const {
    userLogin,
    userRegister,
    updateUser,
    refreshPass,
    getUser
} = require("./service");

module.exports = {
    Auth: (req, res) => {
       
        const login = req.params.login;
        const password = req.params.password;
        console.log("LOGIN");
        console.log(login);
        userLogin(login, password, (err, results) => {
            if (err){
                console.log(err);
            }
            if (!results) {
                return res.status(500).json("Неверный логин или пароль");
            } else {
                return res.json(results);
            }
        });
    },

    GetUser: (req, res) => {
        const id_user = req.params.id_user;
        getUser(id_user, (err, results) => {
            if (err){
                console.log(err);
                return;
            }
            return res.json(results);
        });
    },

    Register: (req, res) => {
        const body = req.body;
	    console.log(body);
        userRegister (body, (err, results) => {
            if (err){
                console.log(err);
            }
            return res.json(results);
        })
    },

    UpdateUser: (req, res) => {
        const body = req.body;
        updateUser (body, (err, results) => {
            if (err){
                console.log(err);
            }
            return res.json(results);
        })
    },

    Refresh: (req, res) => {
        const mail = req.body.email;
        refreshPass (mail, (err, results) => {
            if (err){
                console.log(err);
            }
            return res.json(results);
        })
    }
}