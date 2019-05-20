var express = require('express');
var router = express.Router();
var userDAO = require('../controller/UserDAO');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session && req.session.login) {
    res.redirect('/list');
    return ;
  }
  res.redirect('/login');
});

router.get('/login', function(req, res, next) {
    res.render('main');
});

router.post('/login', function(req, res, next) {
    let login = req.body.login,
        senha = req.body.senha;



    userDAO.find(login, senha).then((user) => {

      if(user === null) {
        res.status(403);
        res.write('<h1>Entrada nao autorizada</h1><form action="login" method="GET" accept-charset="utf-8"><input type="submit" value="Voltar"></form>');
        res.end();
      } else if (login === user.login && senha === user.senha) {
        req.session.login = user.login;
        res.redirect('/list');
      } else {
            res.status(403);
            res.write('<h1>Entrada nao autorizada</h1><form action="login" method="GET" accept-charset="utf-8"><input type="submit" value="Voltar"></form>');
            res.end();
      } 
    });

});

router.get('/logout', (req, res) => {
    delete req.session.login;
    res.redirect('/login');
});

module.exports = router;