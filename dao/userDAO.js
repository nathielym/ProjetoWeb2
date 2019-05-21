let client = require('mongodb').MongoClient;

module.exports = class UserDAO {

  static connect(callback) {
    return client.connect('mongodb://127.0.0.1:27017',
      { useNewUrlParser: true });
  }

  static get(callback) {
    return UserDAO.connect().then((conn) => {
      let db = conn.db('mongo-test');
      return db.collection('user').find().toArray();
    });
  }

  static getByName(nome) {
    return UserDAO.connect().then((conn) => {
      let db = conn.db('mongo-test');
      return db.collection('user').find({ "nome": nome });
    });
  }

  static insert(nome, senha) {
    return UserDAO.connect().then((conn) => {
      let db = conn.db('mongo-test');
      db.collection('user').insertOne({ nome: nome, senha: senha });
    });
  }

  static delete(nome) {
    return UserDAO.connect().then((conn) => {
      let db = conn.db('mongo-test');
      db.collection('user').deleteOne({ nome: nome });
    });
  }
}