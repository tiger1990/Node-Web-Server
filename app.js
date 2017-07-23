const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//for heroku
const port = process.env.PORT || 3000;

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

// server.use((req, resp, next)=>{

//      //resp.render('maintainence.hbs');
//     resp.render('maintainence.hbs',{

//         maintainTitle: 'Site under maintainence',
//         error :  'There is some technical error !'
//     });
// });

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


//for heroku dynami c port
// listen on this port
server.listen(port, () => {
    console.log(`server is up on port ${port}`);
});

//generating ssh key for node server
//ssh-keygen -t rsa -b 4096 -C 'deepakpanwar1990@gmail.com'
//to give public key to third party server
//id_rsa.pub   //start up ssh agent  and add this key
//deepakpanwar@node-webserver $eval "$(ssh-agent -s)"
//Agent pid 697
//adding identity
//deepakpanwar@node-webserver $ssh-add ~/.ssh/id_rsa
//Identity added: /Users/deepakpanwar/.ssh/id_rsa (/Users/deepakpanwar/.ssh/id_rsa)
//copy rsa pub key
//pbcopy < ~/.ssh/id_rsa.pub
//check connection with github
//ssh -T git@github.com