const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const app = express();
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log('db-connected'))
  .catch((e) => console.log(e));

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

fs.readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`app is running on port ${port}`));
