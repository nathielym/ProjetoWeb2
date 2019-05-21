mongo = require('mongodb');
let client = require('mongodb').MongoClient;

module.exports = class PostDAO {
    static connect (callback) {
        return client.connect('mongodb://127.0.0.1:27017',
                {useNewUrlParser: true});
    }

    static get (callback) {
        return PostDAO.connect().then((conn) => {
            let db = conn.db('mongo-test');
            return db.collection('post').find().toArray();
        });
    }

    static insert (text) {
        return PostDAO.connect().then((conn) => {
            let db = conn.db('mongo-test');
            db.collection('post').insertOne({text: text});
        });
    }

    static delete (_id) {
        return PostDAO.connect().then((conn) => {
            let db = conn.db('mongo-test');
            db.collection('post').deleteOne({_id: new mongo.ObjectId(_id)});
        });
    }
}