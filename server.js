const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use((req,res,next) => {
  var now = new Date().toString(); 
  var log = `${now} : ${req.method} ${req.url}`;
  fs.appendFile('server.log',log+'/n',(err) => {
    if (err) {
      console.log("error couldn't find");
    }
  });
  next();
})
// app.use((req,res,next) => {
//   res.render('maintenence.hbs')
// })
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});
app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'projects page',
    welcomeMessage: 'select your project'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
