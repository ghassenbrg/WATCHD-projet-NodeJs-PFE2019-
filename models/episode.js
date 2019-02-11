const db = require('./db');
const Item = require('../models/item');
const Server = require('../models/server');
class Episode{

    constructor (res , query) {

        this.id = res.id;
        this.season_ref = res.sn;
        this.ep_ref = res.en;
        this.img_url = res.img_url;
        this.date = res.date;

        if (query == "all"){
            this.getItem(query).then(res => this.item = res);
            this.getServers().then(res => this.servers = res);
        } else {
            this.getItem(query).then(res => {
                this.title = res["title"];
                this.type = res["type"];
            });
        }
    }

    dateToJson(date) {
        return [date.getFullYear(), date.getMonth()+1, date.getDate()];
    }

    getItem(query) {
        return new Promise( ( resolve, reject ) => {
            if (query == "all") {
                db.con.query('SELECT * FROM item WHERE id='+this.id, (err,rows) => {
                    if ( err )
                      throw err;
                    let res = new Item(rows[0]);
                    resolve(res);
                });
            } else {
                db.con.query('SELECT title, type FROM item WHERE id='+this.id, (err,rows) => {
                    if ( err )
                      throw err;
                    let res = rows[0];
                    resolve(res);
                });
            }
           });
    }

    getServers() {
        return new Promise( ( resolve, reject ) => {
                db.con.query('SELECT * FROM server WHERE id='+this.id+' AND sn="'+this.season_ref+'" AND en="'+this.ep_ref+'"', (err,rows) => {
                    if ( err )
                      throw err;
                    let res = [];
                    for (let i = 0; i < rows.length; i++){
                        res.push(new Server(rows[i]));
                    }
                    resolve(res);
                });
           });
    }
}

module.exports = Episode;