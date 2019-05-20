let client = require('mongodb').MongoClient;

module.exports = class UserDAO {
    static find(login, senha){
        return client.connect('mongodb://localhost:27017/mongo-test',
        {useNewUrlParser: true}).then((client) => {
            let db = client.db('mongo-test');
            return db.collection('users')
                    .findOne({login: login, senha: senha});
        }).catch((err) => { throw err; });
    }


    
}