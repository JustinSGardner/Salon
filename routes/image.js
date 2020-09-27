'use strict';

const express = require('express'),
    db = require('../models/conn'),
    fetch = require('node-fetch'),
    router = express.Router();

const reviewsList = require('../models/reviewsModel'),
    favoritesList = require('../models/favoritesModel');
var bigData;

//GET render and data for images searched
router.get('/', async (req, res) => {
    res.render('template', {
        locals: {
            title: 'Search',
            is_logged_in: req.session.is_logged_in,
        },
        partials: {
            partial: 'partial-image',
        },
    });
});
//GET all reviews for this object_id
router.get("/:object_id?", async (req, res) => {
  const objectReviews = await reviewsList.showAllReviewsObject(
    req.params.object_id
  );
  const favData = await favoritesList.showIfFavorite(
    req.session.user_id,
    req.params.object_id
  );
  console.log(objectReviews);

    const objId = req.params.object_id;
    await fetch(`https://api.artic.edu/api/v1/artworks/${objId}`)
        .then((res) => res.json())
        .then((json) => {
            bigData = {
                id: json.data.id,
                title: json.data.title,
                url: json.data.thumbnail.url,
                artist_title: json.data.artist_title,
                description: json.data.description,
                place_of_origin: json.data.place_of_origin,
                medium_display: json.data.medium_display,
                date_display: json.data.date_display,
                alt_text: json.data.thumbnail.alt_text,
                artist_display: json.data.artist_display
            };
        });
    console.log(bigData);
    res.render('template', {
        locals: {
            title: '',
            data: objectReviews,
            imgData: bigData,
            favData: favData,
            is_logged_in: req.session.is_logged_in,
        },
        partials: {
            partial: 'partial-imageID',
        },
    });
});
//POST new review for this user_id
router.post("/add/:object_id?", async (req, res) => {
  const object_id = req.params.object_id;
  console.log("post", req.body);
  console.log('object_id:', object_id);
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  const {
    review_text,
  } = req.body;
  const { user_id, username } = req.session;
  await reviewsList.addReview(user_id, username, review_text, today, object_id);
  res.redirect(`/image/${object_id}`);
});
//POST to favorites list for this user_id
router.post("/like/:object_id?", async (req, res) => {
  const object_id = req.params.object_id;
  console.log("post", req.body);
  console.log("username is ", req.session.username)
  const {
    user_id, username
  } = req.session;
  const { title } = req.body
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  await favoritesList.addFavorite(user_id, object_id, title, today);
  res.redirect(`/image/${object_id}`);
});
//DELETE favorite at specific user_id and object_id
router.post("/unlike/:object_id?", async (req, res) => {
  const object_id = req.params.object_id;
  console.log(object_id);
  const {
    user_id
  } = req.session;
  await favoritesList.removeFavorite(user_id, object_id);
  res.redirect(`/image/${object_id}`);
});
//DELETE review at specific review.id
router.post("/delete/:object_id?", async (req, res) => {
  const object_id = req.params.object_id;
  console.log("delete", req.body);
  const {
    id
  } = req.body;
  await reviewsList.removeReview(id);
  res.redirect(`/image/${object_id}`);
});

module.exports = router;
