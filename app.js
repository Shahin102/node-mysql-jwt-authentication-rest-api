const express = require('express');
const app = express();

const studentRoute = require('./api/routes/student');
const userRoute = require('./api/routes/user');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/student', studentRoute);
app.use('/user', userRoute);

app.use((req, res, next) => {
    res.status(404).json({
        error: 'bad request'
    })
})

module.exports = app;