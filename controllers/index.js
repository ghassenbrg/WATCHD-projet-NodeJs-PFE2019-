const db = require('../models/db');
const Item = require('../models/item');
const Season = require('../models/season');
const Episode = require('../models/episode');
class Index {
    constructor() {
    }

    execute(req, res){
        var title = "HomePage | WATCHD.tn";

        let queries = [
          this.getCarousel(),
          this.getLastEpisodes(),
          this.getNewAdded(),
          this.getMostWatched()
        ];

        Promise.all(queries)
        .then(results => {
        // db.con.end();
          res.render('index', {title: title, prefixe: "", page: "index", carousel: results[0], last_episodes: results[1], newAdded: results[2], mostWatched: results[3]});
        })
        .catch(err => {
          console.error('Error fetching data:', err)
        });
    }
    getCarousel(){
      return new Promise( ( resolve, reject ) => {
        db.con.query('SELECT * FROM item ORDER BY date DESC LIMIT 5', (err,rows) => {
            if ( err )
              return reject( err );
            let res= [];
            for (let i = 0; i < rows.length; i++){
              res.push(new Item(rows[i]));
            }
            setTimeout(() => {
              resolve(res);
             }, 50); 
        });
       });
    }

    getLastEpisodes(){
      return new Promise( ( resolve, reject ) => {
        db.con.query('SELECT * FROM episode ORDER BY date DESC LIMIT 3', (err,rows) => {
          if ( err )
              return reject( err );
              let res= [];
              for (let i = 0; i < rows.length; i++){
                res.push(new Episode(rows[i],"notAll"));
              }
              setTimeout(() => {
                resolve(res);
               }, 50); 
      });
       });
    }

    getNewAdded(){
      return new Promise( ( resolve, reject ) => {
        db.con.query('SELECT * FROM season ORDER BY date DESC LIMIT 10', (err,rows) => {
            if ( err )
                return reject( err );
                let res= [];
                for (let i = 0; i < rows.length; i++){
                  res.push(new Season(rows[i]));
                }
                setTimeout(() => {
                  resolve(res);
                 }, 50); 
        });
       });
    }

    getMostWatched(){
      return new Promise( ( resolve, reject ) => {
        db.con.query('SELECT * FROM item ORDER BY views DESC LIMIT 10', (err,rows) => {
            if ( err )
                return reject( err );
                let res= [];
                for (let i = 0; i < rows.length; i++){
                  res.push(new Item(rows[i]));
                }
                setTimeout(() => {
                  resolve(res);
                 }, 50); 
        });
       });
    }
}

module.exports = new Index();