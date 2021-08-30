const express = require('express');
const router = express.Router();
const connectionDB_new = require('./../../db');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
    const sql = "SELECT * FROM students";
    connectionDB_new.query(sql, (err, response) => {
        if (err) console.log(err)
        else res.send(response)
    })
})

router.get('/:id', checkAuth, (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    const sql = "SELECT * FROM `students` WHERE `id`='" + id + "'";
    connectionDB_new.query(sql, (err, response) => {
        if (err) console.log(err)
        else res.send(response)
    })
})

router.post('/', (req, res, next) => {
    // Student Table Creation
    const sqlTable = "CREATE TABLE IF NOT EXISTS `students` ( `id` INT(10) NOT NULL AUTO_INCREMENT key, `first_name` VARCHAR(255) NOT NULL , `last_name` VARCHAR(255) NOT NULL , `gender` TEXT NOT NULL , `email` VARCHAR(255) NOT NULL , `mobile_no` INT(10) NOT NULL )";
    connectionDB_new.query(sqlTable, function (err, result) {
        if (err) throw err;
        console.log("Student Table created !!");
    });

    const fname = req.body.first_name;
    const lname = req.body.last_name;
    const gender = req.body.gender;
    const mail = req.body.email;
    const mob = req.body.mobile_no;

    const sqlInsert = "INSERT INTO `students`(`first_name`,`last_name`,`gender`,`email`,`mobile_no`) VALUES ('" + fname + "','" + lname + "','" + gender + "','" + mail + "','" + mob + "')";
    connectionDB_new.query(sqlInsert, (err, response) => {
        if (err) console.log(err)
        else res.status(200).json({
            msg: 'Student data inserted into database'
        })
    })
})

router.delete('/:id', checkAuth, (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    const sql = "DELETE FROM `students` WHERE `id`='" + id + "'";
    connectionDB_new.query(sql, (err, response) => {
        if (err) console.log(err)
        else res.status(200).json({
            msg: 'Student data has been deleted'
        })
    })
})

router.put('/:id', checkAuth, (req, res, next) => {
    const id = req.params.id;
    console.log(id);

    const fname = req.body.first_name;
    const lname = req.body.last_name;
    const gender = req.body.gender;
    const mail = req.body.email;
    const mob = req.body.mobile_no;

    const sql = "UPDATE `students` SET `first_name`='" + fname + "',`last_name`='" + lname + "',`gender`='" + gender + "',`email`='" + mail + "',`mobile_no`='" + mob + "' WHERE `id`='" + id + "'";

    connectionDB_new.query(sql, (err, response) => {
        if (err) console.log(err)
        else res.status(200).json({
            msg: 'Student data has been updated'
        })
    })
})

module.exports = router;