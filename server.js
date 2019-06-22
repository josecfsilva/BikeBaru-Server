const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');

const app = express();

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

app.use(cors());

/* Homepage */
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/* PARTNERS */
/* Add */
app.get('/partners/add', (req, res) => {
    const { name, nickname, password, circuits, time, events, awards } = req.query;

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
app.get('/partners/edit', (req, res) => {
    const { partner_id, name, nickname, password, circuits, time, events, awards } = req.query;

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
app.get('/partners/delete', (req, res) => {
    const { partner_id } = req.query;

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
app.get('/circuits/add', (req, res) => {
    const { initial_location, final_location, time, distance, velocity, calories, partner_id } = req.query;

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
app.get('/circuits/edit', (req, res) => {
    const { circuit_id, initial_location, final_location, time, distance, velocity, calories, partner_id } = req.query;

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
app.get('/circuits/delete', (req, res) => {
    const { circuit_id } = req.query;

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
