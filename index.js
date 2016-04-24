// Express setup
var express = require('express');
var app = express();

// Jade is our templating engine, which we will use alongside body parser middlware
app.set('view engine', 'jade');

var port = 5000;

// Body parser is the middleware tool to pass data back and forth between the views and express
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

// This is a route to the path localhost:5000/   , in this we render index.jade
// We use "res.render" (http://expressjs.com/en/guide/routing.html)
app.get('/', function(req, res) {
    res.render('index.jade');
});

// This is a route to the path localhost:5000/about , where we render the about page
// However, I'm gonna pass a variable in from this server side, and have it render in the view side
// See "about.jade", and how there's a line: h2= myVariable
// h2 hello is the equivalent as <h2>hello</h2> in html
// However, putting h2= ___ now sets the contents of h2 as a variable we can pass in
app.get('/about', function(req, res) {
    // We pass in the variables that we wish to display on the front end view in JSON format
    // The left side is the variable on the view, and the right side is the variable we pass in
    var blargh = "hello dank memes";
    var yargh = "hi there";
    res.render('about.jade', { myVariable : blargh, myVariable2 : yargh });
});

// OK. Now we know how to pass data from the back end to the front end.
// Let's learn how to send data from a front end form to the back end.
// Generally, when you render a page, it's a "get" request to that URL, that's why the two above links are:
// app.get('/') and app.get('/about')

// We're going to pass data from the front end to the back end via "post" request
// You can do the resesarch yourself about HTTP RESTful architecture later

// app.get('/form') renders the form page
app.get('/form', function(req,res) {
    res.render('form.jade');
});

// When the user presses the "submit" button it starts a post request on that URL
app.post('/form', function(req,res) {
    // The form data is sent inside the "req" variable
    // req.body.____ passes in variables declared in the views
    // so req.body.firstname and req.body.lastname will store what gets passed in through the form
    // firstname and lastname are connected to the form variables defined in form.jade
    var f = req.body.firstname;
    var l = req.body.lastname;
    console.log("inputted first name: " + f);
    console.log("inputted last name: " + l);
    // Gonna pass these variables back to form.jade
    // Note that we did not specify the values of outputFirstName and outputLastName in the above app.get of form.jade, this just means those tags don't exist.
    res.render('form.jade', { outputFirstName : f, outputLastName : l });
});

// Now you know how to pass data back and forth between front end and back end!


// Connect express app to localhost:5000
app.listen(port, function() {
    console.log('App is running on port ' + port);
});
