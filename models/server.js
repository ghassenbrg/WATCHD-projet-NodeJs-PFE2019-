const db = require('./db');

class Server{

    constructor (res , query) {

        this.id = res.id;
        this.season_ref = res.sn;
        this.ep_ref = res.en;
        this.server = res.server;
        this.video_iframe = res.video_iframe;

    }
}

module.exports = Server;