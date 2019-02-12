const db = require('../models/db');
const Item = require('../models/item');
const Season = require('../models/season');
const Episode = require('../models/episode');
class CatPage {
    constructor() {
    }

    execute(type, req, res){
        var title = type+" | WATCHD.tn";

        let queries = [
          this.getItems(type)
        ];

        Promise.all(queries)
        .then(results => {
        // db.con.end();
          res.render('CatPage', {title: title, prefixe: "../../", page: type,  items: results[0]});
        })
        .catch(err => {
          console.error('Error fetching data:', err)
        });
    }

    getItems(type){
      return new Promise( ( resolve, reject ) => {
        db.con.query('SELECT * FROM item WHERE LOWER(type)="'+type+'" ORDER BY date DESC LIMIT 25', (err,rows) => {
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

module.exports = new CatPage();