const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.json');
const app = express();
const port = config.env.test.PORT || 8080;

// import routes
const users = require('./server/routes/user-routes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,access-control-allow-origin");
  next();
});

// Routes
app.use('/user', users);

app.listen(port, () => {
    console.log('Server started on port ' + port );
});