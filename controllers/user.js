import { validate as validateEmail } from 'email-validator'
import UsersModel from '../models/User.js'

export function toSubscribePage(req, res) {
  res.render('subscribe')
}

export async function subscribeUser(req, res) {
  const errors = [];
  const savedData = {}
  const emailValidated = validateEmail(req.body.email)
  const { firstName, lastName, email, password, password_confirm } = req.body;
  const newUser = { firstName, lastName, email, password }
  if (!emailValidated) {
    errors.push("Email invalide !")
  } else {
    savedData.email = email;
  }
  if (password.length === 0) {
    errors.push("IL FAUT UN MDP")
  }
  if (password !== password_confirm) {
    errors.push("Les mdp ne sont pas les mêmes du tout");
  }
  if (firstName.length === 0) {
    errors.push("Faut un prénom");
  } else {
    savedData.firstName = firstName; 
  }
  if (lastName.length === 0) {
    errors.push("Faut un nom de famille");
  } else {
    savedData.lastName = lastName; 
  }
  if (errors.length === 0) {
    try {
      const doc = await UsersModel.create(newUser);
    } catch (err) {
      errors.push("Le compte ne peut pas être créé");
    }  
  }
  if (errors.length > 0) {
    res.render('subscribe', {errors, savedData} )
  } else {
    res.redirect('login?email='+email);
  }

}

export function toLoginPage(req, res) {
  res.render('login', {email: req.query.email || "", errors: req.errors})
}

export async function loginUser(req, res) {
  const errors = [];
  const user = await UsersModel.findOne({email: req.body.email});
  if (!user) {
    errors.push("Cet utilisateur n'existe pas !")
    res.render('login', {errors})
    return
  }
  if (req.body.password !== user.password) {
    errors.push("Mot de passe pas bon")
    res.render('login', {errors, email: req.body.email})
    return
  }
  req.session.user = user;
  res.redirect('/dashboard')
}

export function logoutUser(req, res) {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send(`<h1>Erreur !</h1><p>${err.message}</p>`)
      return
    }
    res.redirect('/login')
  })
}

export function toDashboard(req, res) {
  res.render('dashboard', {user: req.session.user})
}
