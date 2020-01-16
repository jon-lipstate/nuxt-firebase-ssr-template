const { Nuxt } = require('nuxt');
const express = require('express');
const app = express();

const config = {
  dev: false,
  buildDir: '.nuxt',
  build: { publicPath: '/public/' }
};
const nuxt = new Nuxt(config);
// exports.handler = (req, res) => {
//   console.log('Incoming Request: ', req.path);
//   nuxt.render(req, res);
// };

async function handleRequest(req, res) {
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
  console.log('Incoming Request: ', req.path);
  nuxt.render(req, res);
}
app.get('*', handleRequest);
exports.handler = app;
