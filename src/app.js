const express = require('express');
const downloaderRoutes = require('./routes/downloader');

const app = express();

app.use('/api', downloaderRoutes);

module.exports = app;
