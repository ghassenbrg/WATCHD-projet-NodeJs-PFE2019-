const db = require('./db');

class Episode{

    constructor (res , query) {

        this.id = res.id;
        this.season_ref = res.sn;
        this.ep_ref = res.en;
        this.video_frame = res.video_frame;
        this.img_url = res.img_url;
        this.date = res.date;

        if (query == "all"){
            this.getItem().then(res => this.item = res);
        } else {
            this.getItem().then(res => {
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
}

module.exports = Episode;