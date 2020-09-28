'use strict';

const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs');

const usersList = require('../models/usersModel');

router.get('/', (req, res) => {
    res.redirect('/users/login');
});
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});
router.get('/login', async (req, res) => {
    res.render("template", {
        locals: {
            title: 'Log In',
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-login'
        }
    });
});
router.post('/login', async (req, res) => {
    const {
        username,
        password
    } = req.body;
    const userInstance = new usersList(null, username, null, password);
    userInstance.login().then(response => {
        console.log(response);
        req.session.is_logged_in = response.isValid;
        if (!!response.isValid) {
            const {
                email,
                username,
                user_id
            } = response;
            req.session.email = email
            req.session.user_id = user_id
            req.session.username = username
            res.redirect('/')
        } else {
            res.redirect('/users/signup');
        }
    })
})

router.get('/signup', (req, res) => {
    res.render('template', {
        locals: {
            title: 'Sign Up Page',
            is_logged_in: req.session.is_logged_in,
        },
        partials: {
            partial: 'partial-signup'
        },
    });
});

router.post('/signup', (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const userInstance = new usersList(null, username, email, hash);

    userInstance.save().then(response => {
        if (response.id !== undefined) {
            res.redirect('/users/login');
        } else {
            res.redirect('/users/signup');
        }
    });
});
module.exports = router;