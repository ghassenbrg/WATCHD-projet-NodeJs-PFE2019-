const db = require('../models/db');
const Item = require('../models/item');
const Season = require('../models/season');
const Episode = require('../models/episode');
const Server = require('../models/server');
class EpisodePage {
    constructor() {
    }

    execute(id, season_ref, ep_ref, req, res){
        var title = " | WATCHD.tn";
        let queries = [
          this.geEpisode(id, season_ref, ep_ref),
          this.getEpisodes(id, season_ref),
          this.getSeasons(id),
          this.getRelated(id)
        ];

        Promise.all(queries)
        .then(results => {
          //db.con.end();
          title = results[0].item.title +' '+ season_ref + ' ' + ep_ref + title;
          res.render('EpisodePage', {title: title, prefixe: "../../../", page: "episodePage", episode: results[0], other_episodes: results[1], seasons: results[2], related: results[3]});
          
        })
        .catch(err => {
          console.error('Error fetching data:', err)
        });
    }
    geEpisode(id, season_ref, ep_ref){
      return new Promise( ( resolve, reject ) => {
        db.con.query('SELECT * FROM episode WHERE id='+id+' AND sn="'+season_ref+'" AND en="'+ep_ref+'"', (err,rows) => {
            if ( err )
              return reject( err );
            let res= new Episode(rows[0],'all');
            setTimeout(() => {
              resolve(res);
             }, 50); 
        });
       });
    }

    getEpisodes(id, season_ref){
        return new Promise( ( resolve, reject ) => {
            db.con.query('SELECT * FROM episode WHERE id='+id+' AND sn="'+season_ref+'"'+' ORDER BY en ASC', (err,rows) => {
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
            db.con.query('SELECT * FROM season WHERE id='+id+' ORDER BY sn ASC', (err,rows) => {
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

module.exports = new EpisodePage();