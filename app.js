//jshint esversion:6
const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const app = express();
const mongoose = require('mongoose');
// const encrypt=require('mongoose-encryption')
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://127.0.0.1:27017/userDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

// const secret="Thisisourlittlesecret";
// userSchema.plugin(encrypt,{secret:secret ,encryptedFields:['password']});

const User = new mongoose.model("User", userSchema);

app.get("/", function (req, res) {
    res.render("home");
});


app.get("/login", function (req, res) {
    res.render("login");
})
app.get("/register", function (req, res) {
    res.render("register");
})


app.post("/register", function (req, res) {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save().then(function () {
        res.render("secrets");
    }).catch(function (err) {
        console.log(err);
    });
});

app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ email: username }).then(function (founduser) {
        if (founduser.password === password) {
            res.render("secrets");
        }
    }).catch(function (err) {
        console.log(err);
    });
}); 



app.listen(3000, function (req, res) {
    console.log("Server is upand Running on 3000");
});