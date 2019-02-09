const db = require('../models/db');
const Item = db.item();
const Episode = db.episode();
const Season = db.season();

class Index {
    constructor() {
    }
    execute(req, res){
        var title = "WATCHD.tn | Home Page";

        let queries = [
          this.getCarousel(),
          this.getLastEpisodes(),
          this.getNewAdded()
        ];
      
        Promise.all(queries)
        .then(results => {
          res.render('index', {title: title, page: "index", carousel: results[0], last_episodes: results[1], newAdded: results[2]});
        })
        .catch(err => {
          console.error('Error fetching data:', err)
        });
    }
    async getCarousel(){
        let res = await Item.find().limit(4);
        return res;
    }
    async getLastEpisodes(){
        let res = await Episode.find().limit(3);
        return res;
    }
    async getNewAdded(){
        let res = await Item.find().limit(10);
        return res;
    }
}

module.exports = new Index();