'use strict';

const express = require('express'),
    db = require('../models/conn'),
    fetch = require('node-fetch'),
    router = express.Router();

//GET render and data for images searched
router.get('/page/:number?', async (req, res) => {
    if (!req.session.is_logged_in) {
        res.redirect('/')
    } else {
    res.render('template', {
        locals: {
            title: 'Search',
            searchTerm: req.body.searchTerm,
            page_number: req.params.number,
            is_logged_in: req.session.is_logged_in,
        },
        partials: {
            partial: 'partial-image',
        },
    });
}});
router.post('/page/:number?', async (req, res) => {
    res.render('template', {
        locals: {
            title: 'Search',
            searchTerm: req.body.searchTerm,
            page_number: req.params.number,
            is_logged_in: req.session.is_logged_in,
        },
        partials: {
            partial: 'partial-image',
        },
    });
});
module.exports = router;
