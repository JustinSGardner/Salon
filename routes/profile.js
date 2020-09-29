'use strict';

const express = require('express'),
    db = require('../models/conn'),
    router = express.Router();

const reviewsList = require('../models/reviewsModel'),
    favoritesList = require('../models/favoritesModel'),
    usersList = require('../models/usersModel');
    var bigData;

//GET all reviews and favorites for this user_id
router.get('/:user_id?', async (req, res) => {
    if (!req.session.is_logged_in) {
        res.redirect('/')
    } else {
    const userFavorites = await favoritesList.showAllFavorites(req.session.user_id);
    const userReviews = await reviewsList.showAllReviewsProfile(req.session.user_id);
    console.log(userReviews);
    console.log(userFavorites)
    res.render('template', {
        locals: {
            title: `User Profile`,
            data: userReviews,
            dataFav: userFavorites,
            is_logged_in: req.session.is_logged_in,
        },
        partials: {
            partial: 'partial-profile'
        }
    });
}});

//DELETES user and their associated content
router.post('/delete', async (req, res) => {
    const id = req.session.user_id;
    await usersList.removeUser(id)
    req.session.destroy();
    res.redirect('/');
});
//DELETE review at specific review.id
router.post("/review-delete", async (req, res) => {
    console.log("delete", req.body);
    const {
    id
    } = req.body;
    await reviewsList.removeReview(id);
    res.redirect(`/profile`);
});
module.exports = router;