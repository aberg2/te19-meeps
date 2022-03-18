const express = require('express');
const pool = require('../database');
const router = express.Router();

/*
    BASE URL /meeps
    GET / - Get all meeps
    POST / - Create a new task
    GET /:id - Get a task by id
    PUT/:id - Update a task by id
    DELETE /:id - Delete a task by id
    Create, Read, Update, Delete - CRUD

    read - select
    create - insert
    
*/

/* GET home page. */
router.get('/', async (req, res, next) => {
    await pool.promise()
        .query('SELECT * FROM meeps')
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
            task: {
                error: 'Bad request'
            }
        });

    }
    res.json({
        id: req.params.id
    })
});


module.exports = router;
