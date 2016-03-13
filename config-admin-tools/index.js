var colors = require('colors');

module.exports = {
    debugMode: false,
    debug: function(message) {
        if(this.debugMode) {
            console.log("INFO ".blue + message);
        }
    },
    locationOfConfigFiles: null,
    init: function(administrator) {
        if(!administrator.locationOfConfigFiles || administrator.locationOfConfigFiles == '') {
            administrator.locationOfConfigFiles = './config';
        }
        if(!administrator.configRouteName || administrator.configRouteName == '') {
            administrator.configRouteName = '/admin';
        }
        try {
            if(!administrator.username || !administrator.password || !administrator.server)  {
                throw 'Administrator object should contain a username, password and server propery.';
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
        this.administrator.server.set('view engine', 'ejs');
        this.administrator.server.set('views', __dirname + '/views');
        
        
        this.debug('Location of configfiles is ' + this.administrator.locationOfConfigFiles);
        
        
        var router = require('./routes/admin_routes')(this.administrator);
        this.administrator.server.use(administrator.configRouteName, router);
    },
}