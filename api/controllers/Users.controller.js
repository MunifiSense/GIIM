const db = require("../models");
const Users = db.Users;
const Op = db.Sequelize.Op;

exports.addUser = async (req, res) =>{
    // Create User
    const user= {
        email: req.email,
        id: req.id,
        token: req.token
    };  

    const foundUser = await Users.findOne({where: {email: user.email }});
    if(foundUser){
        Users.update(user, {
            where: {email: user.email}
        }).then(data => {
            res.send(user);
        })
        .catch(err => {
            console.log(err);
        })
    }else{     
        // Save new user
        Users.create(user)
        .then(data => {
            res.send(user);
        })
        .catch(err => {
            console.log(err);
        })
    }   
};