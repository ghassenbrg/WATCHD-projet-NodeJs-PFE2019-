const db = require('./db');

class Item{

    constructor (res) {

        this.id = res.id;
        this.title = res.title;
        this.desc = res.description;
        this.type = res.type;
        this.runtime = res.runtime;
        this.rating = res.rating;
        this.released = res.released;

        this.finish = res.finish;
        this.complete = "completed";
        if (res.finish == 0){
          this.finish = '';
          this.complete = "ongoing";
        }
        
        this.language = res.language;
        this.cover_url = res.cover_url;
        this.poster_url = res.poster_url;
        this.date = res.date;

        this.genre = [];
        this.actor = [];
        this.season = [];

        this.setGenre().then(res => this.genre = res);
        this.setActor().then(res => this.actor = res);
        this.setSeason().then(res => this.season = res);
    }

    setGenre(){
      return new Promise( ( resolve, reject ) => {
        db.con.query('SELECT g FROM genre WHERE id='+this.id, (err,rows) => {
          if ( err )
            throw err;
          let res= [];
          for (let i = 0; i < rows.length; i++){
            res.push(rows[i]["g"]);
          }
          resolve(res);
      });
       });
    }

    setActor(){
      return new Promise( ( resolve, reject ) => {
        db.con.query('SELECT name FROM actor WHERE id='+this.id, (err,rows) => {
          if ( err )
            throw err;
          let res= [];
          for (let i = 0; i < rows.length; i++){
            res.push(rows[i]["name"]);
          }
          resolve(res);
      });
       });
    }

    setSeason(){
      return new Promise( ( resolve, reject ) => {
        db.con.query('SELECT count(*) c FROM season WHERE id='+this.id, (err,rows) => {
          if ( err )
            throw err;
          let res= rows[0]["c"];
          resolve(res);
      });
       });
    }
}

module.exports = Item;