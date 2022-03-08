const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config({ path: './.env' });
const morgan = require('morgan');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

app.use(morgan('dev')); // Log http requests and errors
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const queryValue = req.query.value ?? 'Budapest';
  const response = members.filter((item) => item.name !== queryValue);
  console.log(response.sort((a, b) => b.age - a.age));
  if (response[0] !== undefined && response[0] != null) {
    response.map((item) => {
      return res.write(`<h1>Hello ${item.age}!</h1>`);
    });

    res.send();
  } else {
    res.send(`<h1>City name is incorrect!</h1>`);
  }
  /* res.sendFile(path.join(__dirname, 'public', 'index.html')); */
});

/* // Init middleware
app.use(logger); */

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

// Setting the routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 3000;
console.log('process.env:', process.env.PORT);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
