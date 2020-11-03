const db = require("../models");
const UserCharacters = require("../models/UserCharacters");
const Users = db.Users;
const Characters = db.Characters;
const Op = db.Sequelize.Op;

exports.getUserCharacters = (req, res) => {
    const id = req.params.id;
    Characters.findAll({
        include: [{
            model: Users,
            as: 'Users',
            where:{
                user_id: id
            },
            attributes: ["user_id"]
        }]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occured while retrieving the user's characters."
            });
        });
};

exports.addUserCharacter = (req, res) => {
    // Validate request
    if (!req.body.userid) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create UserCharacter
    const userCharacter = {
        user_id: req.body.userid,
        character_id: req.body.charid
    };

    // Save user chracter
    UserCharacters.create(userCharacter)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while adding the character for the user."
            });
        })
};

exports.updateUserCharacter = (req, res) => {
    // Validate request
    if (!req.body.userid) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const userid = req.body.userid;
    const charid = req.body.usercharinfo.charid;
    const userCharacter = {
        level: req.body.usercharinfo.level,
        desired_level: req.body.usercharinfo.desired_level,
        ascended: req.body.usercharinfo.ascended,
        managed: req.body.usercharinfo.managed,
        normal_atk_level: req.body.usercharinfo.normal_atk_level,
        normal_atk_desired__level: req.body.usercharinfo.normal_atk_desired__level,
        q_atk_level: req.body.usercharinfo.q_atk_level,
        q_atk_desired_level: req.body.usercharinfo.q_atk_desired_level,
        e_atk_level: req.body.usercharinfo.e_atk_level,
        e_atk_desired_level: req.body.usercharinfo.e_atk_desired_level
    };

    UserCharacters.update(
        userCharacter,
        {
            where: {
                user_id: userid, 
                character_id: charid
            }
        }
    )
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while updating the character for the user."
        });
    });
};

exports.removeUserCharacter = (req, res) => {
    // Validate request
    if (!req.body.userid) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const userid = req.body.userid;
    const charid = req.body.charid;

    UserCharacters.destroy({where: {
        user_id: userid,
        character_id: charid
    }})
    .then(num => {
        if(num == 1){
            res.send({
                message: "Character was deleted from User successfully!"
            });
        }
        else{
            res.send({
                message: "Character could not be deleted from user!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while deleting the character for the user."
        });
    })
}