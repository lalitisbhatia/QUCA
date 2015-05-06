//load the required modules

var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user.js');

// load the auth variables
//var configAuth = require('./auth');
var config = require('./config.js');

// expose this function to our app using module.exports
module.exports = function(passport,app) {
    //var config = new configAuth(app.get('env'));

    /*
     |--------------------------------------------------------------------------
     |                      PASSPORT SESSION SETUP
     |--------------------------------------------------------------------------
     */
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    /*
     |--------------------------------------------------------------------------
     |                      LOCAL SIGNUP
     |--------------------------------------------------------------------------
     */

    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },function(req,email,password,done){
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function(){
            var usr = req.body;
            console.log('inside passport local signup: ',usr);
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({'local.email':usr.email},function(err,user){
                if(err)
                    //console.log(err);
                    return done(err);
                    //res.send("error while signing up user");
                // check to see if theres already a user with that email
                if(user){
                    console.log("email is already taken");
                    return done(null,false,{'message':'That email is already taken'});

                    //return res.send('That email is already taken')
                }else{
                    // if there is no user with that email, create the user
                    console.log("creating new user");
                    var newUser = new User();
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.local.firstName = req.body.firstName;
                    newUser.local.lastName = req.body.lastName;
                    newUser.profile = {};

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);

                    });
                }

            });
        });
    }));

    /*
     |--------------------------------------------------------------------------
     |                      LOCAL LOGIN
     |--------------------------------------------------------------------------
     */

    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-login',new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },function(req,email,password,done){
            var usr = req.body;
            console.log('inside passport local login: ',usr);
            User.findOne({'local.email':usr.email},function(err,user){
                if(err)
                    return done(err);
                if(!user){
                    console.log('no user found');
                    return done(null,false,{message:'No user found'});
                }

                if(!user.validPassword(usr.password))

                    return done(null,false,{message:'Oops! Invalid password'});

                return done(null,user);
            })
        }
    ));


};