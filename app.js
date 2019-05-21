let http = require('http'),
    UserDAO = require('./dao/userDAO'),
    path = require('path'),
    express = require('express'),
    app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

app.get('/user', (req, res) => {
    UserDAO.get().then((users) => {
        res.render('user', { users: users } );
    });
});

app.post('/user', (req, res) => {
    let nome = req.body.nome,
        method = req.body.method;
    if (method === 'inserir') {
        UserDAO.insert(nome).then((conn) => {
            res.redirect('/user');
        });
    }

    if (method === 'deletar') {
        UserDAO.delete(nome).then((conn) => {
            res.redirect('/user');
        });
    }
});

app.listen(3000);