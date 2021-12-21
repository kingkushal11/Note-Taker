const express = require('express');
const path = require('path');
const fs = require("fs");
const Notes = require('./db/sb.json');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('./Develop/public'));