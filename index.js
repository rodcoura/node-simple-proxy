const express = require('express');
const request = require('request');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use('/*', (req, res) => {
  console.log(req);
  req.pipe(request({ qs: req.query, uri: process.env.PROXY_URL })).pipe(res);
});

app.listen(process.env.PORT, () => {
  console.log(
    `Proxy to ${process.env.PROXY_URL} listening on port ${process.env.PORT}`
  );
});
