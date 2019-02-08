var db = require('./db');

class Collection {



    constructor(){
        this.genre = ['dsfsdf'];
    }

    getGenre(){
        let req = 'SELECT g FROM genre';
        db.getRecords(req,function(res){
            res.forEach(result => { // manipulate the results
                //this.genre= (result['g']);
            });
          });

        console.log(this.genre)
    }
}

module.exports = Collection; //export collection class