const express = require('express');
const pool = require('../database');
const router = express.Router();

/*
    BASE URL /meeps
    GET / - Get all meeps
    POST / - Create a new tweet
    GET /:id - Get a tweet by id
    PUT/:id - Update a tweet by id
    DELETE /:id - Delete a tweet by id
    Create, Read, Update, Delete - CRUD

    read - select
    create - insert
    
*/

/* GET home page. */

router.get('/', async (req, res, next) => {
    await pool.promise()
        .query('SELECT * FROM emlabg_meeps ORDER BY created_at DESC')
        .then(([rows, fields]) => {
            res.render('tweets.njk', {
                meeps: rows,
                title: 'Bard',
                layout: 'layout.njk',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                meeps: {
                    error: 'Error gettings meepss'
                }
            })
        })
});



router.post('/', async (req, res, next) => {
    // { "tweet": "koda post" }
    const tweets = req.body.tweets;

    await pool
        .promise()
        .query('INSERT INTO emlabg_meeps (body) VALUES (?)', [tweets])
        .then((response) => {
            if (response[0].affectedRows === 1) {
                res.redirect('/meeps');
            } else {
                res.status(400).json({
                    tweet: {
                        error: 'Invalid tweet',
                    },
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
});
// res.json(req.body);
router.get('/profile', function (req, res, next) {
    res.render('profile.njk', {
        title: 'Profile',
        layout: 'layout.njk',
    });
});
router.get('/friends', function (req, res, next) {
    res.render('friends.njk', {
        title: 'Friends',
        layout: 'layout.njk',
    });
});
router.get('/:id/delete', async (req,res,next) => {
    const id = req.params.id;
    await pool.promise()
    .query('DELETE FROM emlabg_meeps WHERE id = ?', [id])
    .then((response) => {
        res.redirect('/meeps');
    })
});

module.exports = router;
