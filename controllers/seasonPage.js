const db = require('../models/db');
const Item = require('../models/item');
const Season = require('../models/season');
const Episode = require('../models/episode');
class SeasonPage {
    constructor() {
    }

    execute(id, season_ref, req, res){
        var title = " | WATCHD.tn";
        let queries = [
          this.getSeason(id, season_ref),
          this.getEpisodes(id, season_ref),
          this.getSeasons(id, season_ref),
          this.getRelated(id)
        ];

        Promise.all(queries)
        .then(results => {
          //db.con.end();
          title = results[0].title +' '+ season_ref + title;
          res.render('SeasonPage', {title: title, prefixe: "../../", page: "seasonPage", season: results[0], episodes: results[1], seasons: results[2], related: results[3]});
          
        })
        .catch(err => {
          console.error('Error fetching data:', err)
        });
    }
    getSeason(id, season_ref){
      return new Promise( ( resolve, reject ) => {
        db.con.query('SELECT * FROM season WHERE id='+id+' AND sn="'+season_ref+'"', (err,rows) => {
            if ( err )
              return reject( err );
            let res= new Season(rows[0]);
            setTimeout(() => {
              resolve(res);
             }, 50); 
        });
       });
    }

    getEpisodes(id, season_ref){
        return new Promise( ( resolve, reject ) => {
            db.con.query('SELECT * FROM episode WHERE id='+id+' AND sn="'+season_ref+'"'+' ORDER BY en DESC', (err,rows) => {
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

    getSeasons(id, season_ref){
        return new Promise( ( resolve, reject ) => {
            db.con.query('SELECT * FROM season WHERE id='+id+' AND sn <> "'+season_ref+'" ORDER BY sn DESC', (err,rows) => {
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

    getRelated(id){
      return new Promise( ( resolve, reject ) => {
        db.con.query('SELECT * FROM item WHERE id <> '+id+' AND (type = (SELECT type  FROM item WHERE id='+id+' )) AND ((SELECT count(*)  FROM genre g1  INNER JOIN genre g2 ON g1.g = g2.g AND g2.id='+id+' WHERE g1.id = item.id) > 1) ORDER BY date DESC LIMIT 5', (err,rows) => {  
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
}

module.exports = new SeasonPage();