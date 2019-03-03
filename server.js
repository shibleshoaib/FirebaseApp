const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//let logger = require('morgan');
const admin = require('firebase-admin');
const serviceAccount = require('./intro-proj-firebase-adminsdk-jqqo9-f779ee9ab1.json');
const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://intro-proj.firebaseio.com'
});
const database = firebaseAdmin.database();
//app.use(logger('dev'));
function isAuthenticated(req, res, next) {
    next();
}

app.get('/homecomming-queen', isAuthenticated, (req, res) => {
    res.render('homeCommingQueen.ejs');
});
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('views'));
app.set('views', __dirname + '/views');
app.get('/', (req, res) => {
    const listItemRef = database.ref('/itemNew');
    listItemRef.once('value', (snapshot) => {
        //console.log(snapshot.val());
        const data = snapshot.val();
        if (!data) {
            data = {};
        }
        res.render('home.ejs', { listItems: data });
    });

});

app.post('/', (req, res) => {
    const topic = req.body.topic;
    res.render('results.ejs', { data: topic });
});
const port = process.env.port || 3000;
app.listen(port, () => {
    console.log('App is running on port:' + port);
})