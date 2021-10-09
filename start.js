const express = require('express');
const fs = require('fs');
const path = require('path');
const url = require('url');
const app = express();
const port = process.env.PORT || 3000;

// AL INICIAR EL SERVER
app.listen(port, ()=>{
      console.log('API INICIADA!');
});

// ACCEDER AL index/main DEL SERVER
app.get('/', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send('Hello, API Programming Memes in Spanish working!\n\n' +
          'Documentación\n\n\n' +
          '•Images List: /files/jpg\n' +
          'Example response: {"response":["Array String"],"urlresource":null,"httpstatus":200}\n\n'+
          '•Videos List: /files/mp4\n' +
          'Example response: {"response":["Array String"],"urlresource":null,"httpstatus":200}\n\n'+
          '•Images Access: /files/jpg/*name.jpg*\n' +
          'Example response: IMAGE JPG OR PNG\n\n'+
          '•Videos Access: /files/mp4/*name.mp4*\n' +
          'Example response: VIDEO MP4\n\n'+
          '•Image Access (Random): /files/random/mp4\n' +
          'Example response:{"response":null,"urlresource":"random-name.jpg","httpstatus":200}\n\n'+
          '•Video Access (Random): /files/random/mp4\n' +
          'Example response:{"response":null,"urlresource":"random-name.mp4","httpstatus":200}\n\n'
      )
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
                  res.sendFile('Error-404.webp', options, function (err) {
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
                  res.sendFile('Error-404.webp', options, function (err) {
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
app.get('/files/random/mp4', (req, res) => {
      const errorResource = req.protocol + '://' + req.get('host') + '/files/jpg/Error-404.webp';

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
app.get('/files/random/jpg', (req, res) => {
      const errorResource = req.protocol + '://' + req.get('host') + '/files/jpg/Error-404.webp';

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