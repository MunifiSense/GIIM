const db = require("../models");
const Users = db.Users;
const Op = db.Sequelize.Op;

exports.addUser = async (req, res) =>{
    // Create User
    const user= {
        id: req.id,
        email: req.email,
        token: req.token
    };  

    const foundUser = await Users.findOne({where: {id: user.id }});
    if(foundUser){
        Users.update(user, {
            where: {id: user.id}
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