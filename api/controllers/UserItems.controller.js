const db = require("../models");
const Users = db.Users;
const Items = db.Items;
const Domains = db.Domains;
const Monsters = db.Monsters;
const UserItems = db.UserItems;
const Op = db.Sequelize.Op;

exports.getUserItems = (req, res) => {
    const id = req.id;
    const userItemCount = UserItems.count({where : {user_id: id}});
    const itemCount = Items.count();
    if(userItemCount !== itemCount){
        this.addUserItems(req,res)
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occured while add the user's Items."
            });
        });
    }
    Items.findAll({
        include: [{
            model: Users,
            as: 'Users',
            where:{
                user_id: id
            },
            attributes: ['user_id']
        },{
            model: Monsters
        },{
            model: Domains
        }]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occured while retrieving the user's Items."
            });
        });
};

exports.addUserItems = (req, res) => {
    const userid = req.id;
    console.log(userid);
    Items.findAll()
    .then(data => {
        var userItems = [];
        data.forEach(element => {

            const userItem= {
                user_id: userid,
                item_id: element.item_id
            }

            userItems.push(userItem);
        })

        UserItems.bulkCreate(userItems,
            {
                fields : ["user_id", "item_id"],
                updateOnDuplicate: ["user_id"] 
            });

        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while adding the Item for the user."
            });
    })
};

exports.updateUserItem = (req, res) => {
    // Validate request
    if (!req.id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const userid = req.id;
    const itemid = req.body.itemid;
    const userItem = {
        amount: req.body.amount,
        forge: req.body.forge
    };

    UserItems.update(
        userItem,
        {
            where: {
                user_id: userid, 
                item_id: itemid
            }
        }
    )
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while updating the Item for the user."
        });
    });
};

exports.removeUserItem = (req, res) => {
    const userid = req.id;
    const itemid = req.params.itemid

    UserItems.destroy({where: {
        user_id: userid,
        item_id: itemid
    }})
    .then(num => {
        if(num == 1){
            res.send({
                message: "Item was deleted from User successfully!"
            });
        }
        else{
            res.send({
                message: "Item could not be deleted from user!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while deleting the Item for the user."
        });
    })
}