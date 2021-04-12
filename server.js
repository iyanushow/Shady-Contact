const express = require('express');
const connectDB = require('./config/dbconnect');
const path = require('path')

//  define constants
const app = express();
const PORT = process.env.PORT || 4000;

//  CONNECT TO DATABASE
connectDB();

// REQ BODY MIDDLEWARE PARSER
app.use(express.json({ extended: false }));

// DEFINE ROUTES
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));

if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Connected to the Server on port ${PORT}`);
});
