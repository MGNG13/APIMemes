const express = require('express');
const fs = require('fs');
const path = require('path');
const url = require('url');
const app = express();
const port = process.env.PORT || 3000;

// ACCEDER AL index/main DEL SERVER
app.get('/', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send('Hello, API Programming Memes in Spanish working!');
});

// ACCEDDER A TODAS LAS IMAGENES
app.get('/files/jpg', (req, res) => {
      fs.readdir(path.join(__dirname, 'memes/jpg'), (err, files) => {
            if (err !== null) {
                  const response = new Object();
                  response.response = err.toString();
                  response.urlresource = null;
                  response.httpstatus = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.send(500, JSON.parse(JSON.stringify(response, null, 2)));
            } else {
                  const response = new Object();
                  response.response = files;
                  response.urlresource = null;
                  response.httpstatus = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.send(JSON.parse(JSON.stringify(response, null, 2)));
            }
      });
});

// ACCEDER A TODOS LOS VIDEOS
app.get('/files/mp4', (req, res) => {
      fs.readdir(path.join(__dirname, 'memes/mp4'), (err, files) => {
            if (err !== null) {
                  const response = new Object();
                  response.response = err.toString();
                  response.urlresource = null;
                  response.httpstatus = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.send(500, JSON.parse(JSON.stringify(response, null, 2)));
            } else {
                  const response = new Object();
                  response.response = files;
                  response.urlresource = null;
                  response.httpstatus = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.send(JSON.parse(JSON.stringify(response, null, 2)));
            }
      });
});

// VERIFICAR QUE EXISTE UN RECURSO JPG
app.get('/files/resource/jpg', (req, res) => {
      var url_parts = url.parse(req.url, true);
      var queryresource = url_parts.query.resource;
      var fullUrl = req.protocol + '://' + req.get('host') + '/files/mp4';
      const errorResource = fullUrl + __dirname + '/error/Error-404.webp';

      if (queryresource !== '' && queryresource !== undefined) {
            if (!fs.existsSync(path.join(__dirname, 'memes', 'jpg', queryresource))) {
                  const response = new Object();
                  response.response = 'Resource not exist';
                  response.urlresource = errorResource;
                  response.httpstatus = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.send(500, JSON.parse(JSON.stringify(response, null, 2)));
                  console.log('Error: File not exist');
            } else {
                  const fullUrl = req.protocol + '://' + req.get('host') + '/files/jpg';
                  const response = new Object();
                  response.response = null;
                  response.urlresource = fullUrl + '/' + queryresource;
                  response.httpstatus = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.send(200, JSON.parse(JSON.stringify(response, null, 2)));
                  console.log('Sended JPG meme! => ', queryresource);
            }

      } else {
            const response = new Object();
            response.response = 'resource null in URL QUERY';
            response.urlresource = errorResource;
            response.httpstatus = 400;
            res.setHeader('Content-Type', 'application/json');
            res.send(400, JSON.parse(JSON.stringify(response, null, 2)));
            console.log('Error: resource null in URL QUERY');
      }
});

// VERIFICAR QUE EXISTE UN RECURSO MP4
app.get('/files/resource/mp4', (req, res) => {
      var url_parts = url.parse(req.url, true);
      var queryresource = url_parts.query.resource;
      var fullUrl = req.protocol + '://' + req.get('host') + '/files/mp4';
      const errorResource = fullUrl + __dirname + '/error/Error-404.webp';

      if (queryresource !== '' && queryresource !== undefined) {
            if (!fs.existsSync(path.join(__dirname, 'memes', 'mp4', queryresource))) {
                  const response = new Object();
                  response.response = 'Resource not exist';
                  response.urlresource = errorResource;
                  response.httpstatus = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.send(500, JSON.parse(JSON.stringify(response, null, 2)));
                  console.log('Error: File not exist');
            } else {
                  const fullUrl = req.protocol + '://' + req.get('host') + '/files/mp4';
                  const response = new Object();
                  response.response = null;
                  response.urlresource = fullUrl + '/' + queryresource;
                  response.httpstatus = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.send(200, JSON.parse(JSON.stringify(response, null, 2)));
                  console.log('Sended MP4 meme! => ', queryresource);
            }

      } else {
            const response = new Object();
            response.response = 'resource null in URL QUERY';
            response.urlresource = errorResource;
            response.httpstatus = 400;
            res.setHeader('Content-Type', 'application/json');
            res.send(400, JSON.parse(JSON.stringify(response, null, 2)));
            console.log('Error: resource null in URL QUERY');
      }
});

// ACCEDER A EL RECURSO JPG DEL MEME
app.get('/files/jpg/:resource', (req, res) => {
      var options = {
            root: path.join(__dirname, 'memes', 'jpg')
      };

      res.sendFile(req.params.resource, options, function (err) {
            if (err) {
                  var options = {
                        root: path.join(__dirname, 'error')
                  };
                  res.sendFile(req.params.resource, options, function (err) {
                        if (err) {
                              console.log('Error: ' + err.toString());
                        } else {
                              console.log('Sended JPG meme! => ', fileName);
                        }
                  });
            } else {
                  console.log('Sended JPG meme! => ', fileName);
            }
      });
});

// ACCEDER A EL RECURSO MP4 DEL MEME
app.get('/files/mp4/:resource', (req, res) => {
      var options = {
            root: path.join(__dirname, 'memes', 'mp4')
      };

      res.sendFile(req.params.resource, options, function (err) {
            if (err) {
                  var options = {
                        root: path.join(__dirname, 'error')
                  };
                  res.sendFile(req.params.resource, options, function (err) {
                        if (err) {
                              console.log('Error: ' + err.toString());
                        } else {
                              console.log('Sended MP4 meme! => ', fileName);
                        }
                  });
            } else {
                  console.log('Sended MP4 meme! => ', fileName);
            }
      });
});

// ACCEDER A UN MEME MP4
app.get('/files/resource/random/mp4', (req, res) => {
      var url_parts = url.parse(req.url, true);
      var fullUrl = req.protocol + '://' + req.get('host') + '/files/mp4';
      const errorResource = fullUrl + __dirname + '/error/Error-404.webp';

      fs.readdir(path.join(__dirname, 'memes/mp4'), (err, files) => {
            if (err !== null) {
                  const response = new Object();
                  response.response = err.toString();
                  response.urlresource = errorResource;
                  response.httpstatus = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.send(500, JSON.parse(JSON.stringify(response, null, 2)));
                  console.log('Error: ' + err.toString());
            } else {
                  var fileToSend = files[getRandomInt(0, files.length)];
                  var fullUrl = req.protocol + '://' + req.get('host') + '/files/mp4';
                  var response = new Object();
                  response.response = null;
                  response.urlresource = fullUrl + '/' + fileToSend;
                  response.httpstatus = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.send(200, JSON.parse(JSON.stringify(response, null, 2)));
                  console.log('Sended MP4 meme! => ', fileToSend);
            }
      });
});

// ACCEDER A UN MEME JPG
app.get('/files/resource/random/jpg', (req, res) => {
      var url_parts = url.parse(req.url, true);
      var fullUrl = req.protocol + '://' + req.get('host') + '/files/mp4';
      const errorResource = fullUrl + __dirname + '/error/Error-404.webp';

      fs.readdir(path.join(__dirname, 'memes/jpg'), (err, files) => {
            if (err !== null) {
                  const response = new Object();
                  response.response = err.toString();
                  response.urlresource = errorResource;
                  response.httpstatus = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.send(500, JSON.parse(JSON.stringify(response, null, 2)));
                  console.log('Error: ' + err.toString());
            } else {
                  var fileToSend = files[getRandomInt(0, files.length)];
                  var fullUrl = req.protocol + '://' + req.get('host') + '/files/jpg';
                  var response = new Object();
                  response.response = null;
                  response.urlresource = fullUrl + '/' + fileToSend;
                  response.httpstatus = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.send(200, JSON.parse(JSON.stringify(response, null, 2)));
                  console.log('Sended JPG meme! => ', fileToSend);
            }
      });
});

// NUMEROS ALEATORIOS
function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
}

// CACHAR ERRORES DEL SERVER SIN DETENERLO
process.on('unhandledRejection', (reason, p) => {
      console.error(reason, ' Unhandled Rejection at Promise ', p);
}).on('uncaughtException', err => {
      console.error(err, ' Uncaught Exception thrown');
});