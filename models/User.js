/*
  Voici la structure d'un document Utilisateur sur lequel vous vous baserez pour faire le Schéma mongoose :

  {
    firstName  // type String, obligatoire
    lastName  // type String, obligatoire
    email  // type String, obligatoire
    password  // type String, obligatoire
  }

*/

import mongoose from 'mongoose'

const UserSchema = mongoose.Schema(
  {
    // _id: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   required: true,
    //   default: () => new mongoose.Types.ObjectId(),
    // },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false } // Supprime la propriété "__v" ajoutée automatiquement par Mongoose à chaque document
);

const UsersModel = mongoose.model('Users', UserSchema, "TP_users")

export default UsersModel