var colors = require('colors');



module.exports = {
    
    administrator: {},
    debugMode: false,
    debug: function(message) {
        if(this.debugMode) {
            console.log("INFO ".blue + message);
        }
    },

    init: function(administrator) {
        console.log(this.module_root);
        try {
            if(!administrator.username || !administrator.password) {
                throw 'Administrator object should contain a username and password propery.';
            }  
        } catch (err) {
            console.log("ERROR: ".red + err.yellow);
            return false;
        }
        this.administrator = administrator;
        if(administrator.debug && typeof administrator.debug === 'boolean' ) {
            this.debugMode = administrator.debug;
        }
        this.debug("Administrator created: " + this.administrator.username.yellow + ", " + this.administrator.password.yellow);
        this.setRoutes();
        
    },
    
    setRoutes: function(options) {
        this.administrator.server.get('/admin', function(req, res) {
            res.render(__dirname + "/views/index.ejs");
        });
        this.administrator.server.post('/admin', function(req, res) {
            console.log(req.body.username);
            res.render(__dirname + "/views/index.ejs");
        });
        
    },
    
    setMongodDb: function() {
        
    },
    
    openMongoDb: function() {
        
    },
    
    createAdministrator: function() {
        
    },
    
    loadAdministrator: function() {
        
    },
    
    openConfigFile: function(file, callback) {
        
    },
    
    openConfigFileSync: function() {
        
    }
}