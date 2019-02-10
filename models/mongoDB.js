const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/watchd');

class db {

    constructor(){  

        mongoose.connect('mongodb://localhost/watchd') // try to connect to the db
        .then(() => {
            this.conn = true;
            console.log('Connected to database.'); //successfully connected
        })
        .catch(err => {
            this.conn = false;
            console.log('Error while trying to connect !') //handling an error while connecting
        });
    }

    item() {
        let itemSchema = mongoose.Schema({ // define an item schema by using mongoose
            _id: Number,
            title: String,
            desc: String,
            type: String,
            runtime: String,
            genre: [ String ],
            actors: [ String ],
            rating: Number,
            released: Number,
            finished: Number,
            language: String,
            cover_url: String,
            poster_url: String,
            date: Date
        }); 
        return mongoose.model('Item', itemSchema, 'items'); // create a model
    }

    season() {
        let seasonSchema = mongoose.Schema({ // define a season schema by using mongoose
            item_id: Number,
            ref: String,
            poster_url: String,
        }); 
        return mongoose.model('Season', seasonSchema, 'seasons'); // create a model
    }

    episode() {
        let episodeSchema = mongoose.Schema({ // define a season schema by using mongoose
            item_id: String,
            season_ref: String,
            title: String,
            ep_ref: String,
            servers: [
                {
                    name: String,
                    iframe: String,
                }
            ],
            img_url: String,
            date: Date
        }); 
        return mongoose.model('Episode', episodeSchema, 'episodes'); // create a model
    }

}

module.exports = new db(); //export an instance of the db