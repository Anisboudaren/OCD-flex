const express = require('express');
const routes = require('./routes/index');
const session = require('express-session');
const { connectDB } = require('./config/db');
const extractToken = require("./middleware/extractToken")
const CookieParser = require('cookie-parser')
const passport = require('passport');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors')
const morgan = require("morgan");
const MongoStore = require('connect-mongo');
require('dotenv').config()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin : '*' , 
    credentials : true ,
}  
));

app.use(CookieParser());
app.use(extractToken);
app.use(morgan('tiny'));

app.use(session({
    store :  MongoStore.create({mongoUrl: process.env.MONGO_URI }),
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
    cookie : {
        maxAge: 604800000 //7 days in miliseconds
    }
}));

require("./middleware/auth/local-strategie.js")
app.use(passport.initialize());
app.use(passport.session());

// require("./middleware/auth/google-strategie.js")

//handles coming requests
app.use('/api' , routes);

//attempt connecting to db
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1); // Exit the process with failure code
});


module.exports = app;
