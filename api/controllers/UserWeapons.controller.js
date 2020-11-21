const db = require("../models");
const Users = db.Users;
const Weapons = db.Weapons;
const UserWeapons = db.UserWeapons;
const Op = db.Sequelize.Op;

exports.getUserWeapons = (req, res) => {
    const id = req.params.id;
    Weapons.findAll({
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
                    err.message || "An error occured while retrieving the user's Weapons."
            });
        });
};

exports.addUserWeapon = (req, res) => {
    // Validate request
    if (!req.body.userid) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create UserWeapon
    const userWeapon = {
        user_id: req.body.userid,
        weapon_id: req.body.weaponid
    };

    console.log(userWeapon);

    // Save user weapon
    UserWeapons.create(userWeapon)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while adding the Weapon for the user."
            });
        })
};

exports.updateUserWeapon = (req, res) => {
    // Validate request
    if (!req.body.userid) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const userid = req.body.userid;
    const weaponid = req.body.weaponid;
    const userWeapon = {
        level: req.body.level,
        desired_level: req.body.desired_level,
        ascended: req.body.ascended,
        managed: req.body.managed
    };

    UserWeapons.update(
        userWeapon,
        {
            where: {
                user_id: userid, 
                weapon_id: weaponid
            }
        }
    )
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while updating the Weapon for the user."
        });
    });
};

exports.removeUserWeapon = (req, res) => {
    const userid = req.params.id;
    const weaponid = req.query.weaponid

    UserWeapons.destroy({where: {
        user_id: userid,
        weapon_id: weaponid
    }})
    .then(num => {
        if(num == 1){
            res.send({
                message: "Weapon was deleted from User successfully!"
            });
        }
        else{
            res.send({
                message: "Weapon could not be deleted from user!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while deleting the Weapon for the user."
        });
    })
};