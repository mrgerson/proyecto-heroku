import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();

//conexión a bases de datos 
//const mongoose = require('mongoose');
import mongoose from 'mongoose';


/* const uri = 'mongodb://localhost:27017/udemy';
const options = {useNewUrlParser: true, useCreateIndex: true};
// Or using promises
mongoose.connect(uri, options).then(
  () => { console.log('conectado a mongodb')},
  err => { err }
); */

try {
  mongoose.connect('mongodb://localhost:27017/udemy');
  console.log('conectado a mongodb')
} catch (error) {
  handleError(error);
}

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
/* 
app.get('/', (req, res) => {
  res.send('Hello World!');
}); */

app.use('/api', require('./routes/nota'));


// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log('Escuchando por el puerto '+ app.get('puerto'));
});