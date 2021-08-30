const express = require('express');
const router = express.Router();
const connectionDB_new = require('./../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next) => {
    // // User Table Creation
    const sqlTable = "CREATE TABLE IF NOT EXISTS `users` ( `id` INT(10) NOT NULL AUTO_INCREMENT key, `user_name` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , `user_type` TEXT NOT NULL , `email` VARCHAR(255) NOT NULL , `phone` INT(10) NOT NULL )";
    connectionDB_new.query(sqlTable, function (err, result) {
        if (err) throw err;
        console.log("User Table created !!!");
    });

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        else {
            const user = req.body.user_name;
            const pass = hash;
            const type = req.body.user_type;
            const mail = req.body.email;
            const mob = req.body.phone;

            const sqlInsert = "INSERT INTO `users`(`user_name`,`password`,`user_type`,`email`,`phone`) VALUES ('" + user + "','" + pass + "','" + type + "','" + mail + "','" + mob + "')";
            connectionDB_new.query(sqlInsert, (err, response) => {
                if (err) console.log(err)
                else res.status(200).json({
                    msg: 'Signup data has been inserted into the database'
                })
            })
        }
    })
})

router.post('/login', (req, res, next) => {
    const name = req.body.user_name;

    console.log(name);
    const sql = "SELECT * FROM `users` WHERE `user_name`='" + name + "'";

    connectionDB_new.query(sql, (err, user) => {
        console.log(user[0].password);
        if (err) {
            return res.status(401).json({
                msg: 'User not exist'
            })
        }
        else {
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                console.log(req.body.password);
                console.log(user[0].password);
                if (!result) {
                    return res.status(401).json({
                        msg: 'Password matching failed'
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        username: user[0].user_name,
                        userType: user[0].user_type,
                        email: user[0].email,
                        phone: user[0].phone
                    },
                        "Secret",
                        {
                            expiresIn: "24h"
                        }
                    );
                    res.status(200).json({
                        username: user[0].user_name,
                        userType: user[0].user_type,
                        email: user[0].email,
                        phone: user[0].phone,
                        token: token
                    })
                }
            })
        }
    })
})

module.exports = router;
