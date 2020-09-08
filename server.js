const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('capitalizeIt', (text)=>{
    return text.toUpperCase();
})
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if (err){
            console.log('An error has occured')
        }
    })
    next();
})
// app.use((req,res, next)=>{
//     res.render('maintenance.hbs')
// })
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    // res.send('<h1>Hello</h1>')
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to my website',
    })
})

app.get('/about', (req,res)=>{
    res.render('about.hbs', {
        pageTitle: 'About page',
    });
})

app.get('/bad', (req,res)=>{
    res.send({
        error: 'Unhandleable request'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
});