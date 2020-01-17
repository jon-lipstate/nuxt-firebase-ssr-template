const { Nuxt } = require('nuxt');
const express = require('express');
const app = express();
exports.handler = app;

const config = {
  dev: false,
  buildDir: '.nuxt',
  build: { publicPath: '/public/' }
};
const nuxt = new Nuxt(config);

async function handleRequest(req, res) {
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
  console.log(`[${req.ip}] requested [${req.path}]`);
  nuxt.render(req, res);
}
app.get('*', handleRequest);
