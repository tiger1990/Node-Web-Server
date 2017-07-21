const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var server = express();

hbs.registerPartials(__dirname + '/views/partials');
//handler engines
//handle bar view engines for express   
/// ejs or pug are also handler view engines
server.set('view engine', 'hbs');

//this method is used like in authentication without calling next 
//further statements will not execute
server.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method}  ${req.url}`;
    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append server logs');
        }
    });
    next();
});

server.use((req, resp, next)=>{

     //resp.render('maintainence.hbs');
    resp.render('maintainence.hbs',{

        maintainTitle: 'Site under maintainence',
        error :  'There is some technical error !'
    });
});

//give path to render default page of website
server.use(express.static(__dirname + '/public'));

//call function inside handlers
hbs.registerHelper("getCurrentYear", () => {

    return new Date().getFullYear();
});

hbs.registerHelper('capitalize', (text) => {
    return text.toUpperCase();
});




server.get('/testad', (request, response) => {
    response.render('testad.hbs', {
        pageTitle: 'Add Page Loaded',
        welcomeMessage: "Welcome to my testad"
    });
});

server.get('/home', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home Title',
        welcomeMessage: "Welcome to my Home"
    });
});

//send json
server.get('/movies', (request, response) => {

    response.send({

        name: 'Deepak',
        movies: [{
                name: 'Terminator',
                actor: 'Arnold'
            },
            {
                name: 'Terminator',
                actor: 'Arnold'
            }
        ]
    });

});


server.get('/listmovies', (request, response) => {

    response.send({
        movies: [{
                name: 'Terminator',
                actor: 'Arnold'
            },
            {
                name: 'Terminator',
                actor: 'Arnold'
            }
        ]
    });
});

// listen on this port
server.listen(3000, () => {
    console.log('server is up on port 3000');
});