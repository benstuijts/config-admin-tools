var express         = require('express');
var router          = express.Router();
var bodyParser      = require('body-parser');
var session         = require('express-session');
var fs              = require('fs');
var jsonfile        = require('jsonfile');

module.exports = function(administrator) {
    administrator.configFiles = __dirname + '/../.' + administrator.locationOfConfigFiles;
    administrator.token = randomString(32);
    
    /* MiddleWare */
    router.use( bodyParser.json() );       // to support JSON-encoded bodies
    router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
      extended: true
    })); 
    
    router.use(function(req,res,next){
        res.locals = {
            token: administrator.token,
            configRouteName: administrator.configRouteName,
            message: {
                type: null,
                text: ''
            }
        }
        next();
    });
    
    var isLoggedIn = function(req, res, next) {
        if(!req.session.login) {
            res.redirect('/admin');
        } else {
            next();
        }
    }
    
    router.use(session({
        secret: 'ssshhhhh',
        resave: false,
        saveUninitialized: true,
    }));
    
    
    router.get('/', function(req, res, error){
        

        res.render('index', { 
            
            message: null
        }); 
    });
    
    router.post('/', function(req, res){
        if(!req.body.token || req.body.token !== administrator.token ) {
            res.render('index.ejs', { 
                message: '<b>Invalid form token!</b>.'
            }); 
        }
        if(req.body.username === administrator.username && req.body.password === administrator.password) {
            req.session.login = true;
            res.redirect(administrator.configRouteName + '/core');
        } else {
            res.render('index.ejs', { 
                message: '<b>Invalid login</b>. Please check your username and password.'
            }); 
        }
    });
    
    router.get('/logout', function(req,res){
        req.session.login = false;
        res.redirect(administrator.configRouteName);
    });
    
    
    
    router.get('/core', isLoggedIn, function(req,res){
        
        console.log(__dirname);
        fs.readdir(administrator.configFiles, function(error, files){
            res.render('admin', {
                configFileNames: files,
                configFilename: req.session.configFilename || '', 
            });
        });
    
        
    });
    
    router.post('/core', function(req,res){
        if(req.body.newfile && req.body.newfile != '') {
            console.log(req.body.newfile.split('.')[1]);
            if(req.body.newfile.split('.')[1] !== 'json') {
                
            };
            
            // WERK ALLEEN WANNEER ER GEEN EXTENSIE WORDT OPGEGEVEN!
            
            jsonfile.writeFile(administrator.configFiles + '/' + req.body.newfile , '', {spaces: 2}, function (err) {
                if(err) console.log('ERROR' + error);
                if(!err) console.log('config succesfully updated');
                res.redirect(administrator.configRouteName + '/core');
            });
        }
    });
    
    router.get('/core/open/:file', isLoggedIn,  function(req, res){
       req.session.configFilename = req.params.file;
       res.redirect(administrator.configRouteName + '/core');
    });
    
    return router;
}




function randomString(r){var a="";if(!r)var r=8;for(var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=0;r>t;t++)a+=n.charAt(Math.floor(Math.random()*n.length));return a}