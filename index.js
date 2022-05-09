const express = require('express');
const request = require('request');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

//simple proxy using request library, could be axios also, but this is faster
app.all('*', (req, res) => {
  req
    .pipe(
      request({
        qs: req.query,
        uri: process.env.PROXY_URL + req.url,
      })
    )
    .pipe(res);
});

app.listen(process.env.PORT, () => {
  console.log(
    `Proxy to ${process.env.PROXY_URL} listening on port ${process.env.PORT}`
  );
});
