var express = require('express');
const router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');

const sqlite3 = require('sqlite3').verbose();
var path = require('path');
var dbPath = path.resolve('info.db');
var dbPath2 = path.resolve('messaging.db');
var db = new sqlite3.Database(dbPath, (err) => {
  if (err)
  {
    return console.error(err.message);
  }

  else
    console.log('Connected to the database.');
});

var db2 = new sqlite3.Database(dbPath2, (err) => {
  if (err)
  {
    return console.error(err.message);
  }

  else
    console.log('Connected to the second database.');
});

db.serialize(function ()
{
    db.run("CREATE TABLE IF NOT EXISTS info (first TEXT, last TEXT, email TEXT, pass TEXT)");
});

db2.serialize(function ()
{
    db2.run("CREATE TABLE IF NOT EXISTS messaging (email TEXT, subject TEXT, message TEXT, decodedMess TEXT, frm TEXT)");
});

var currentUser;
var currentUserPass;
var message;
var decodedMessage;

/* GET home page. */
router.get('/', function(req, res)
{
  res.render('login', { title: 'Login' });
});

router.get('/signup', function(req, res)
{
  res.render('signup', { title: 'Signup' });
});

router.get('/index', function(req, res)
{
  res.render('index', { title: 'Home' });
});

router.get('/message', function(req, res)
{
  res.render('message', { title: 'Message' });
});

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', function(req, res)
{
  var email2 = req.body.email;
  var pass2 = req.body.password;

  db.all("SELECT email, pass FROM info", function(err, rows) {
    rows.forEach(function (row) {
          if(row.email == email2 && row.pass == pass2)
          {
            currentUser = email2;
            currentUserPass = pass2;
            res.render('index', { title: 'Home' });
          }
        });
      });
    /*if (currentUser == null)
    {
      res.render('login', { title: 'Login' });
    }*/
});

router.post('/signup', function(req, res)
{
  var first1 = req.body.first;
  var last1 = req.body.last;
  var email1 = req.body.email2;
  var pass1 = req.body.password2;

  if (first1 == null)
  {
    res.render('signup', { title: 'Signup', message: 'First name cannot be blank'});
  }

  else if (last1 == null)
  {
    res.render('signup', { title: 'Signup', message: 'Last name cannot be blank'});
  }

  else if (email1 == null)
  {
    res.render('signup', { title: 'Signup', message: 'Email cannot be blank'});
  }

  else if (email1.indexOf('@') == -1)
  {
    res.render('signup', { title: 'Signup', message: 'Invalid email'});
  }

  else if (pass1 == null)
  {
    res.render('signup', { title: 'Signup', message: 'Password cannot be blank'});
  }

  else
  {
    db.run("INSERT INTO info (first, last, email, pass) VALUES(?, ?, ? , ?)", first1, last1, email1, pass1) ;
    res.redirect('/');
  }
});

router.post('/index', function(req, res)
{
    message = req.body.TA2;
    decodedMessage = req.body.TA1;

    if(message == null)
    {
      res.render('index', { title: 'Home', message: 'No message to send'});
    }

    else
      res.redirect('/message');
});

router.post('/index2', function(req, res)
{
  var array = [];
  var temp;
  db2.all("SELECT email, subject, message, decodedMess, frm FROM messaging", function(err, rows) {
    rows.forEach(function (row) {
      if(row.email == currentUser)
      {
        temp = {email: row.email, subject: row.subject, mess: row.message, deMess: row.decodedMess, frm: row.frm};
        console.log(temp['mess']);
        array.push(temp);
      }
    });
  });

  if (temp == null)
  {
    res.render('inbox', { title: 'Inbox', error: 'Inbox is empty'});
  }

  else
    res.render('inbox', { title: 'Inbox', message: array});
});

router.post('/message', function(req, res)
{
  var email3 = req.body.email3;
  var subject = req.body.subject;
  var found = false;

  if (subject != null && email3 != null)
  {
    db.all("SELECT email FROM info", function(err, rows) {
      rows.forEach(function (row) {
            if(row.email == email3)
            {
                db2.run("INSERT INTO messaging (email, subject, message, decodedMess, frm) VALUES(?, ?, ?, ?, ?)", email3, subject, message, decodedMessage, currentUser);
                found = true;
              }
            });
          });
    }

    else
    {
      res.render('message', { title: 'Message', message: 'Error, fields cannot be blank'});
    }

  if(found = false)
  {
    res.render('message', { title: 'Message', message: 'User does not exist'});
  }

  else
      res.render('index', { title: 'Home'});
});

module.exports = router;
