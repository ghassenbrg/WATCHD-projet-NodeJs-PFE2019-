const db = require('./db');

class Season{

    constructor (res) {

        this.id = res.id;
        this.season_ref = res.sn;
        this.poster_url = res.poster_url;
        this.date = res.date;

        this.title = "";
        this.type = "";
        this.rating = "";
        
        if (res["finish"] == 0){
          this.complete = "ongoing";
        } else {
            this.complete = "completed";
        }

        this.getItem().then(res => {
            this.title = res["title"];
            this.type = res["type"];
            this.rating = res["rating"];
            this.cover_url = res["cover_url"];
        });
    }

    getItem(query) {
        return new Promise( ( resolve, reject ) => {
            db.con.query('SELECT title, type, rating, cover_url, finish FROM item WHERE id='+this.id, (err,rows) => {
                if ( err )
                  throw err;
                let res = rows[0];
                resolve(res);
            });
        });
    }
}

module.exports = Season;