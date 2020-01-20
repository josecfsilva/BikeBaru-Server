const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const bodyParser = require("body-parser");

const app = express();

app.use(require('sanitize').middleware);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/* Connection to database */
const connection = mysql.createConnection({
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'b8604840bfde86',
    password: '43469a61',
    database: 'heroku_f8a46b7758f670e'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    setInterval(function () {
        connection.query('SELECT 1');
    }, 5000);
});

/* Homepage */
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/* PARTNERS */
/* Add */
app.post('/partners/add',  (req, res) => {
    const name = req.bodyString('name');
    const nickname = req.bodyString('nickname');
    const password = req.bodyString('password');
    const circuits = req.bodyInt('circuits');
    const time = req.bodyString('time');
    const events = req.bodyInt('events');
    const awards = req.bodyInt('awards');

    const INSERT_PARTNERS_QUERY = `INSERT INTO partners (name, nickname, password, circuits, time, events, awards) 
    VALUES ('${name}', '${nickname}', '${password}', ${circuits}, '${time}', ${events}, ${awards})`;

    connection.query(INSERT_PARTNERS_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send("Successfully added partner");
        }
    });
});

/* Edit */
app.put('/partners/edit/:id', (req, res) => {
    const partner_id = req.bodyInt('partner_id');
    const name = req.bodyString('name');
    const nickname = req.bodyString('nickname');
    const password = req.bodyString('password');
    const circuits = req.bodyInt('circuits');
    const time = req.bodyString('time');
    const events = req.bodyInt('events');
    const awards = req.bodyInt('awards');

    const EDIT_PARTNERS_QUERY = `UPDATE partners
    SET name = '${name}', nickname = '${nickname}', password = '${password}', circuits = '${circuits}', time = '${time}', events = '${events}', awards = '${awards}'
    WHERE partner_id = '${partner_id}';`

    connection.query(EDIT_PARTNERS_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send("Successfully edited partner");
        }
    });
});

/* Delete */
app.delete('/partners/delete/:id', (req, res) => {
    const partner_id = req.paramInt('id');

    const DELETE_PARTNERS_QUERY = `DELETE FROM partners WHERE partner_id='${partner_id}';`

    connection.query(DELETE_PARTNERS_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send("Successfully deleted partner");
        }
    });
});

/* Select */
app.get('/partners', (req, res) => {
    const SELECT_ALL_PARTNERS_QUERY = `SELECT * FROM partners`;

    connection.query(SELECT_ALL_PARTNERS_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    });
});

/* CIRCUITS */
/* Add */
app.post('/circuits/add', (req, res) => {
    const initial_location = req.bodyString('initial_location');
    const final_location = req.bodyString('final_location');
    const time = req.bodyString('time');
    const distance = req.bodyFloat('distance');
    const velocity = req.bodyFloat('velocity');
    const calories = req.bodyInt('calories');
    const partner_id = req.bodyInt('partner_id');

    const INSERT_CIRCUITS_QUERY = `INSERT INTO circuits (initial_location, final_location, time, distance, velocity, calories, partner_id) 
    VALUES ('${initial_location}', '${final_location}', '${time}', ${distance}, ${velocity}, ${calories}, ${partner_id})`;

    connection.query(INSERT_CIRCUITS_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send("Successfully added circuit");
        }
    });
});

/* Edit */
app.put('/circuits/edit/:id', (req, res) => {
    const circuit_id = req.bodyInt('circuit_id');
    const initial_location = req.bodyString('initial_location');
    const final_location = req.bodyString('final_location');
    const time = req.bodyString('time');
    const distance = req.bodyFloat('distance');
    const velocity = req.bodyFloat('velocity');
    const calories = req.bodyInt('calories');
    const partner_id = req.bodyInt('partner_id');

    const EDIT_CIRCUITS_QUERY = `UPDATE circuits
    SET initial_location = '${initial_location}', final_location = '${final_location}', time = '${time}', distance = '${distance}', velocity = '${velocity}', calories = '${calories}', partner_id = '${partner_id}'
    WHERE circuit_id = '${circuit_id}';`

    connection.query(EDIT_CIRCUITS_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send("Successfully edited circuit");
        }
    });
});

/* Delete */
app.delete('/circuits/delete/:id', (req, res) => {
    const circuit_id = req.paramInt('id');

    const DELETE_CIRCUITS_QUERY = `DELETE FROM circuits WHERE circuit_id='${circuit_id}';`

    connection.query(DELETE_CIRCUITS_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send("Successfully deleted circuit");
        }
    });
});

/* Select */
app.get('/circuits', (req, res) => {
    const SELECT_ALL_CIRCUITS_QUERY = `SELECT * FROM circuits`;

    connection.query(SELECT_ALL_CIRCUITS_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    });
});

app.listen(process.env.PORT || 4000, function () {
    console.log('Your node js server is running');
});
