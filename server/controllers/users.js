const User = require('../models/User.js');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const ExtractJwt = passportJWT.ExtractJwt;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'movieratingapplicationsecretkey';

module.exports.controller = (app) => {
    app.post('/users/register', (req, res) => {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        User.createUser(newUser, (error, user) => {
            if (error) {
                res.status(422).json({
                    message: 'Something went wrong. Please try again after some time!',
                });
            }
            res.send({ user });
        });
    });

    app.post('/users/login', (req, res) => {
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            User.getUserByEmail(email, (err, user) => {
                if (!user) {
                    res.status(404).json({ message: 'The user does not exist' });
                } else {
                    User.comparePassword(password, user.password, (error, isMatch) => {
                        if (error) {
                            throw err;
                        } if (isMatch) {
                            const payload = { id: user._id };
                            const token = jwt.sign(payload, jwtOptions.secretOrKey);
                            res.json({ message: 'ok', token: token });
                        } else {
                            res.status(401).json({ message: 'The password is incorrect !' });
                        };
                    });
                };
            });
        };
    });
};