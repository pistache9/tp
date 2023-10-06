export function mustBeLoggedIn(req, res, next) {
  if (!req.session?.user) {
    res.redirect('/login')
    return
  }
  next()
}

export function mustBeLoggedOut(req, res, next) {
  if (req.session?.user) {
    res.redirect('/dashboard')
    return
  }
  next()
}