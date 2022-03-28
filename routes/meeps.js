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
        .query('SELECT * FROM meeps ORDER BY created_at DESC')
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
                    error: 'Error gettings meeps'
                }
            })
        })
});


router.get('/:id', async (req, res, next) => {

    const id = req.params.id;
    if (isNaN(req.params.id)) {
        res.status(400).json({
            tweet: {
                error: 'Bad request'
            }
        });

    }
    res.json({
        id: req.params.id
    })
});
router.post('/', async (req, res, next) => {
    // { "tweet": "koda post" }
    const tweets = req.body.tweets;

    await pool
        .promise()
        .query('INSERT INTO meeps (body) VALUES (?)', [tweets])
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
            res.status(500).json({
                tweet: {
                    error: 'Error getting tweets',
                },
            });
        });

    // res.json(req.body);
});


module.exports = router;
