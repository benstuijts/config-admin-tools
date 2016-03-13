var colors = require('colors');

module.exports = {
    debugMode: false,
    debug: function(message) {
        if(this.debugMode) {
            console.log("INFO ".blue + message);
        }
    },
    init: function(administrator) {
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
        var router = require('./routes/admin_routes')(this.administrator);
        this.administrator.server.use('/admin', router);
    },
}