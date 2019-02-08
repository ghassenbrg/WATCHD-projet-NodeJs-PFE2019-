const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/watchd');

class db {

    constructor(){  

        mongoose.connect('mongodb://localhost/watchd') // try to connect to the db
        .then(() => {
            this.conn = true;
            console.log('Connected.'); //successfully connected
        })
        .catch(err => {
            this.conn = false;
            console.log('Error while trying to connect !') //handling an error while connecting
        });

        const itemSchema = mongoose.Schema({ // define an item schema by using mongoose
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
            poster_url: String
        }); 

         this.Item = mongoose.model('Item', itemSchema, 'items');
         this.getS();
    }

    async getS() {
        const test = await this.Item.find().count();
        console.log(test);
    }
}
module.exports = new db(); //export an instance of the db