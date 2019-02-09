const db = require('./db');

const ItemParent = db.item();

class Item extends ItemParent {

    constructor () {
        super();
    }
    getValue(query){
        console.log(res[query]);
        return res[query]
    }
}

module.exports = Item;