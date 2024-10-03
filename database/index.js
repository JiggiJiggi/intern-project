import express from 'express';
import db from './models/index.js'; // Corrected path

const app = express();

/*
app.get('/insert', (req, res) => {
    res.send('insert');
    db.Services.create({
        ServiceName: "Resume",
        Duration: "30"
    }).catch(err => {
        if (err) {
            console.error(err);
        }
    });
});
*/

db.sequelize.sync().then((req) => {
    app.listen(3001, () => {
        console.log("Server running");
    });
});

