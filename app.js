let http = require('http'),
    UserDAO = require('./dao/userDAO'),
    PostDAO = require('./dao/postDAO')
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

app.get('/post', (req, res) => {
    PostDAO.get().then((posts) => {
        res.render('post', { posts: posts } );
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