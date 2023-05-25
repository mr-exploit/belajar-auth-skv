const express = require('express');
const jwt = require('jsonwebtoken');
const Category = require('./database/models/Category');
const Article = require('./database/models/Article');

const secretKey = '6P8NVeUmFOOaYXDKuhKaN08SRJCqqj';

const users = [
    {
        id: 99,
        username: 'admin',
        password: '1q2w3e4r',
    },
    {
        id: 100,
        username: 'player',
        password: '4r3e2w1q'
    }
];

const app = express();

app.use(express.json());

const handlerGetCategories = async (req, res, next) => {
    const result = await Category.findAll();
    res.json(result);
};

const handlerGetArticles = async (req, res) => {
    const result = await Article.findIniKontenMaxTwo();
    res.json(result);
};

const handlerPostArticle = async (req, res) => {
    // const query = req.query;
    const body = req.body;

    // const query = req.params;

    // console.log(body);

    // res.send('ok');

    const result = await Article.create({
        id: body.id,
        judul: body.judul,
        konten: body.konten,
    });

    res.json(result);
};

const middlewareValidation = (req, res, next) => {
    const body = req.body;
    if (typeof body.id !== 'number') {
        res.send('error id harus number');
    }else if( typeof body.konten !== 'string') {
        res.send('error konten harus string');
    }

    next();
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2ODQ1MDI4MTF9.MfmKK0hdTj-O6SBKVmo1u6C1lOh0XW72X9smgn9eCz8
const auth = (req, res, next) => {
    try {
        const tokenDariUser = req.header('authorization');
        const decoded = jwt.verify(tokenDariUser, secretKey);

        if (decoded.sub !== 99) {
            res.status(401);
            res.send({
                error: 'anda tidak berhak mengakses ini'
            })
    
            return;
        }
    } catch (error) {
        res.status(401);
        res.send({
            error: 'token tidak valid'
        })

        return;
    }

    next();
};

app.post('/login', (req, res) => {
    const audience = req.header('x-audience');

    const username = req.body.username;
    const password = req.body.password;

    const userFound = users.find((user) => user.username === username && user.password === password);

    if (!userFound) {
        res.status(401);
        res.send({
            error: 'username password salah'
        });

        return;
    }

    const token = jwt.sign({
        sub: userFound.id,
        iss: 'skilvul',
        aud: audience,
        exp: parseInt(((new Date()).getTime() / 1000) + 5 * 60 * 60),
    }, secretKey);

    res.send({
        token: token
    });
});

// GET: /categories
app.get('/categories', handlerGetCategories);

// GET: /articles
app.get('/articles', auth, handlerGetArticles);

// url -> endpoint
// POST: /buat-article
app.post('/buat-article', middlewareValidation, handlerPostArticle);

app.listen(4400);
