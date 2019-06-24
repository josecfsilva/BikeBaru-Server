const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/* Connection to database */
const connection = mysql.createConnection({
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'b27677399abca5',
    password: '60784499',
    database: 'heroku_26c444707dcb2da'
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
app.post('/partners/add', (req, res) => {
    const name = req.body.name;
    const nickname = req.body.nickname;
    const password = req.body.password;
    const circuits = req.body.circuits;
    const time = req.body.time;
    const events = req.body.events;
    const awards = req.body.awards;

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
    const partner_id = req.body.partner_id;
    const name = req.body.name;
    const nickname = req.body.nickname;
    const password = req.body.password;
    const circuits = req.body.circuits;
    const time = req.body.time;
    const events = req.body.events;
    const awards = req.body.awards;

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
    const partner_id = req.params.id;

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
    const initial_location = req.body.initial_location;
    const final_location = req.body.final_location;
    const time = req.body.time;
    const distance = req.body.distance;
    const velocity = req.body.velocity;
    const calories = req.body.calories;
    const partner_id = req.body.partner_id;

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
    const circuit_id = req.body.circuit_id;
    const initial_location = req.body.initial_location;
    const final_location = req.body.final_location;
    const time = req.body.time;
    const distance = req.body.distance;
    const velocity = req.body.velocity;
    const calories = req.body.calories;
    const partner_id = req.body.partner_id;

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
    const circuit_id = req.params.id;

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
