const LocalStrategy = require('passport-local').Strategy;


const {User} = require('./user');

module.exports = function (passport) {

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });


  passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(user => done(null, user))
        .catch(err => done(err, null));
});





passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
function(req, email, password, done) {
  User.findOne({ 'local.email': email }).then(user => {
    if (user) {
      return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
    } else {
      var newUser = new User();
      newUser.local.email = email;
      newUser.local.password = newUser.generateHash(password);

      return newUser.save();
    }
  })
  .then(newUser => done(null, newUser))
  .catch(err => done(err));
}
));


passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
function(req, email, password, done) {
  User.findOne({ 'local.email': email }).then(user => {
    if (!user) {
      return done(null, false, req.flash('loginMessage', 'No user found.'));
    }
    if (!user.validPassword(password)) {
      return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
    }
    return done(null, user);
  }).catch(err => done(err));
}
));
};


