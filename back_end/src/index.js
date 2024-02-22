import 'dotenv/config';
import cors from 'cors';
import express from 'express';
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);


const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}


const app = express();
app.use(flash());
app.use(cors());
app.use(bodyParser.json());

app.use(session({
  secret: 'cats',
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: 'None', // Set SameSite to None
    secure: true,     // Make sure to set secure to true if your site is served over HTTPS
  },
}));

const waldoRouter = require('../routes/waldo');
const indexRouter = require('../routes/index');

app.use('/', indexRouter);
app.use('/waldo', waldoRouter);
 
  app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);