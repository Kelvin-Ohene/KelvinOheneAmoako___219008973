const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = express('mongoose');
const session = require('express-session');
const passport = require('passport');
const { MongoClient } = require('mongodb');
const expressMongoDb = require('express-mongo-db');
const config = require('./config')
    //app.use(expressMongoDb(config.database.url));
const url = 'mongodb://127.0.0.1:27017/';


mongoose.connect('mongodb://localhost:27017/login');

const otherroutes = require('./routes/otherroutes');
const auth = require('./routes/auth')(passport);

const app = express();
app.use(expressMongoDb(config.database.url));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + `/public`));
app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(cookieParser());

app.use(session({
    secret: 'form',
    resave: false,
    saveUninitialized: false,
}));


app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport);

app.use('/', otherroutes);
app.use('/auth', auth);
const users = require('./routes/users');

/*const expressValidator = require('express-validator')
app.use(expressValidator())*/

const methodOverride = require('method-override')

app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {

        const method = req.body._method
        delete req.body._method
        return method
    }
}))

const flash = require('express-flash')


app.use(cookieParser('keyboard cat'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(flash())
app.use('/users', users)
    //app.use('/route', require('./route/routes'))

app.post('/upload', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        const dbo = db.db("goodhealthDb");
        dbo.collection("patient").insertOne(

            {

                fname: req.body.fname,
                lname: req.body.lname,
                dob: req.body.dob,
                num: req.body.num,
                add: req.body.add,
                enum: req.body.enum
            },
            function(err, result) {
                if (err) throw err;
                res.redirect('/')
                    //res.json(result);
                db.close();
            });
    })
});


app.post('/upload2', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        const dbo = db.db("goodhealthDb");
        dbo.collection("payment").insertOne(

            {

                fname: req.body.fname,
                lname: req.body.lname,
                med: req.body.med,
                amount: req.body.amount,
                balance: req.body.balance
            },
            function(err, result) {
                if (err) throw err;
                res.redirect('/')

                db.close();
            });
    })
});

/*app.get('/', (req, res) => {
    res.render("home")
});


app.get('/pay', (req, res) => {
    res.render("pay")
});
app.get('/inputdetails', (req, res) => {
    res.render("inputdetails", {
        Employeesss
    })
});*/

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running on port ${port}`)
});
/*app.listen(3000, function() {
    console.log("active on port 3000")
});*/