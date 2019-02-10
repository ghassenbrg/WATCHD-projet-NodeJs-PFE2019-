const mysql = require('mysql');


class db {

    constructor(){  
        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "watchd"
          });
        this.con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
          });
    }

}

module.exports = new db(); //export an instance of the db