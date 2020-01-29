const Connection = require('./index');


const all = async() => {
    return new Promise( (resolve,reject) =>{

        Connection.query('SELECT * from Stuff', (error, result)=> {           //Stuff is the name of your mysql table
                    if (error) {
                        return reject(error);
                    }
                    resolve(result)
                    
                }
        )

    });

}


exports.all = all ;