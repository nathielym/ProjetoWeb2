let http = require('http'),
  UserDAO = require('./dao/userDAO'),
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


app.post('/user', (req, res) => {
  let nome = req.body.nome,
    senha = req.body.senha,
    method = req.body.method;
  if (method === 'inserir') {
    // UserDAO.insert(nome, senha).then((conn) => {
    //     res.redirect('/user');
    // });
    UserDAO.get().then((users) => {
      users.forEach(function (user) {
        if (nome == user.nome && senha == user.senha)
          console.log("Senha correta!!");
        else
          console.log("Senha incorreta!!");
          console.log(user.senha + " | " + senha);
          console.log(user.nome + " | " + nome);
      });
    });
  }

  if (method === 'deletar') {
    UserDAO.delete(nome).then((conn) => {
      res.redirect('/user');
    });
  }
});

app.listen(3000);