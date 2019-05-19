let client = require('mongodb').MongoClient;

module.exports = class UserDAO {
    static connect (callback) {
        return client.connect('mongodb://mongo:27017',
                {useNewUrlParser: true});
    }

    static get (callback) {
        return UserDAO.connect().then((conn) => {
            let db = conn.db('mongo-test');
            return db.collection('user').find().toArray();
        });
    }

    static insert (nome) {
        return UserDAO.connect().then((conn) => {
            let db = conn.db('mongo-test');
            db.collection('user').insertOne({nome: nome});
        });
    }

    static delete (nome) {
        return UserDAO.connect().then((conn) => {
            let db = conn.db('mongo-test');
            db.collection('user').deleteOne({nome: nome});
        });
    }
}