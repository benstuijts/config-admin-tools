var express         = require('express');
var router          = express.Router();
var bodyParser      = require('body-parser')

module.exports = function(administrator) {
    
    router.use( bodyParser.json() );       // to support JSON-encoded bodies
    router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
      extended: true
    })); 
    
    router.get('/', function(req, res, error){
        administrator.token = randomString(32);

        res.render('index', { 
            token: administrator.token,
            message: null
        }); 
    });
    
    router.post('/', function(req, res){
        if(!req.body.token || req.body.token !== administrator.token ) {
            res.render('index.ejs', { 
                token: administrator.token,
                message: '<b>Invalid form token!</b>.'
            }); 
        }
        if(req.body.username === administrator.username && req.body.password === administrator.password) {
            res.render('admin');
        } else {
            res.render('index.ejs', { 
                token: administrator.token,
                message: '<b>Invalid login</b>. Please check your username and password.'
            }); 
        }
    });
    
    return router;
}




function randomString(r){var a="";if(!r)var r=8;for(var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=0;r>t;t++)a+=n.charAt(Math.floor(Math.random()*n.length));return a}