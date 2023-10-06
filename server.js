import dotenv from 'dotenv';
import express from 'express';
import session from "express-session";
import path from 'path';
import { fileURLToPath } from 'url';
import MongoStore from "connect-mongo"
import mongoose from "mongoose";
import route from './routes/routes.js';


// ==========
// App initialization
// ==========

dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV, SESSION_SECRET,PSEUDO_MANGOOSE, PASSWORD_MANGOOSE, DATABASE_NAME  } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set('view engine', 'pug');
app.locals.pretty = NODE_ENV !== 'production'; // Indente correctement le HTML envoyé au client (utile en dev, mais inutile en production)

// ==========
// App middlewares
// ==========

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'NODESHOP_SESSION',
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl: `mongodb+srv://${PSEUDO_MANGOOSE}:${PASSWORD_MANGOOSE}@cluster0.gwinucb.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`})
}));

app.use(express.urlencoded({ extended: false }));


// ==========
// App routers
// ==========

app.use('/', route);

// Connexion à la DB

try {
  await mongoose.connect(`mongodb+srv://${PSEUDO_MANGOOSE}:${PASSWORD_MANGOOSE}@cluster0.gwinucb.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`)
  console.log('✅ Connecté à la base MongoDB')
}
catch (err) {
  console.error('Erreur de connexion', err.message)
}

// ==========
// App start
// ==========

app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});
