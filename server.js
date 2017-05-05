const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

//middleware
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append log')
        }
    });

    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) =>{
    // res.send('<h1>Hello express!</hi1>');
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeTxt: 'Welcome text'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        body: 'Body text'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'error handeling request'
    });
});

app.get('*', (req, res) => {
    res.send({
        errorMessage: `Could not find page: ${req.url}`
    });
});

app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});
