let http = require('http'),

UserDAO = require('./dao/userDAO'),
PostDAO = require('./dao/postDAO')
path = require('path'),
express = require('express'),
app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.get('/user', (req, res) => {
  UserDAO.get().then((users) => {
    res.render('user', { users: users });
  });
});

app.get('/post', (req, res) => {
    PostDAO.get().then((posts) => {
        res.render('post', { posts: posts } );
    });
});

app.get('/newUser', (req, res) => {
  UserDAO.get().then((users) => {
    res.render('newUser', { users: users });
  });
});

app.post('/user', (req, res) => {
  let nome = req.body.nome,
    senha = req.body.senha,
    method = req.body.method;
  if (method === 'inserir') {
    
    UserDAO.get().then((users) => {
      users.forEach(function (user) {
        if (nome == user.nome && senha == user.senha)
          res.redirect('/post')
        else{
          res.status(403);
          res.write('<h1>Login incorreto!!!</h1><form action="user" method="GET" accept-charset="utf-8"><input type="submit" value="Voltar"></form>');
        }
      });
    });
    
  }
  if (method === 'deletar') {
    UserDAO.delete(nome).then((conn) => {
      res.redirect('/user');
    });
  }

});

app.post('/newUser', (req,res) => {
  console.log("entrei");

  let nome = req.body.nome,
    senha = req.body.senha,
    method = req.body.method;
    console.log("entrei");
    if (method === 'cadastrar'){
      UserDAO.get().then((users) => {
        users.forEach(function (user) {
          if(nome == user.nome){
            res.write('<h1>nome ja utilizado</h1><form action="user" method="GET" accept-charset="utf-8"><input type="submit" value="Voltar"></form>');
          }
          res.redirect('/user');
        });
        if(nome != "" && senha != ""){
          UserDAO.insert(nome, senha).then((conn) => {
           res.redirect('/user');
        });
        }else{
          res.write('<h1>campos não podem estar em branco</h1><form action="newuser" method="GET" accept-charset="utf-8"><input type="submit" value="Voltar"></form>');
        }
      });
    }
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

app.listen(3000);