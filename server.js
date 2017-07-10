var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var mysql = require('mysql');
var path = require('path');
var db = require('./models');

var app = express();
var PORT = (process.env.PORT || 3000);

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//require('./routes/html-routes.js')(app);
require('./routes/api-routes.js')(app);

db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log('Listening to PORT ' + PORT);
    });
});