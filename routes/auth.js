const express = require('express');
const router = express.Router();
const user = require('../db/patient');


module.exports = function(passport) {

    router.post('/signup', function(req, res, ) {
        const body = req.body,
            username = body.username,
            password = body.password;
        user.findOne({ username: username }, function(err, doc) {
            if (err) { res.status(500).send('error occured') } else {
                if (doc) {
                    res.status(500).send('username already exists')
                } else {
                    const record = new user()
                    record.username = username;
                    record.password = record.hashPassword(password)
                    record.save(function(err, user) {
                        if (err) {
                            res.send(500).send('db error')

                        } else {
                            res.send(user)
                        }

                    })

                }
            }

        })
    });


    router.post('/login', passport.authenticate('local', {
            failureRedirect: '/login',
            successRedirect: '/admin',
        })),
        function(req, res) {
            res.send('hey')
        }
    return router;
};