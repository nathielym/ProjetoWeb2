let http = require('http'),
  UserDAO = require('./dao/userDAO'),
  PostDAO = require('./dao/postDAO'),
  path = require('path'),
  express = require('express'),
  app = express();

  var router = express.Router();

  var aux;

UserDAO = require('./dao/userDAO'),
PostDAO = require('./dao/postDAO')
path = require('path'),
express = require('express'),
app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req,res){
  res.redirect('/user');
});
app.get('/user', (req, res) => {
  UserDAO.get().then((users) => {
    res.render('user', { users: users });
  });
});


app.get('/', function(req, res) {
    res.redirect('/user');
});

app.get('/profile', (req, res) => {
  UserDAO.get().then((users) => {
    res.render('profile', { users: users });
  });
});

app.post('/user', (req, res) => {
  let nome = req.body.nome,
    senha = req.body.senha,
    method = req.body.method;
  if (method === 'login') {

    var userT = null;

    UserDAO.get().then((users) => {
      users.forEach(function (user) {
        if (nome == user.nome && senha == user.senha)
          aux = nome;
          userT = user;
      });
      if (userT != null) {
        res.redirect('/post');
      }
      else {
        res.status(403);
        res.write('<h1>Login incorreto!!!</h1><form action="user" method="GET" accept-charset="utf-8"><input type="submit" value="Voltar"></form>');
      }
    });

  }
  if (method === 'deletar') {
    UserDAO.delete(nome).then((conn) => {
      res.redirect('/user');
    });
  }

});

app.get('/post', (req, res) => {
    PostDAO.get().then((posts) => {
      res.render('post', { posts: posts, user: aux });
    });
});

app.post('/post', (req, res) => {
  let text = req.body.text,
    _id = req.body._id,
    method = req.body.method;
  if (method === 'inserir') {
    PostDAO.insert(text).then((conn) => {
      res.redirect('/post');
    });
  }

  if (method === 'deletar') {
    PostDAO.delete(_id).then((conn) => {
      res.redirect('/post');
    });
  }
});

app.get('/newUser', (req, res) => {
  UserDAO.get().then((users) => {
    res.render('newUser', { users: users });
  });
});

app.post('/newUser', (req, res) => {
  console.log("entrei");

  let nome = req.body.nome,
    senha = req.body.senha,
    method = req.body.method;
  console.log("entrei");
  if (method === 'cadastrar') {
    UserDAO.get().then((users) => {
      users.forEach(function (user) {
        if (nome == user.nome) {
          res.write('<h1>nome ja utilizado</h1><form action="user" method="GET" accept-charset="utf-8"><input type="submit" value="Voltar"></form>');
          res.redirect('/user');
        }

      });
      if (nome != "" && senha != "") {
        UserDAO.insert(nome, senha).then((conn) => {
          res.redirect('/user');
        });
      }
    });
  }

});


app.post('/profile', (req,res) => {

  let nome = req.body.nome,
    method = req.body.method;
    if (method === 'follow'){
        UserDAO.seguir(nome).then((conn) => {
            res.redirect('/post');
        });
      }
});


app.listen(process.env.PORT);