const express = require('express');
const bodyParser = require('body-parser');
const Liste = require('./data/liste');
let app = express();

app.listen(3000, () => {
    console.log('Listening on port 3000 !');
});

app.use('/pages', express.static('./client/pages'));
app.use('/src', express.static('./client/src'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*------------*/
/*---Routes---*/
/*------------*/
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

// liste
app.get('/liste', (req, res) => {
    res.send(Liste);
});

// element
app.get('/api/manga/:id', (req, res) => {
    for (let i = 0; i < Liste.length; i++) {
        if (Liste[i]['id'] == req.params.id) {
            let obj = {
                id: Liste[i]['id'],
                titre: Liste[i]['titre'],
                auteur: Liste[i]['auteur'],
                tomes: Liste[i]['tomes'],
                parution: Liste[i]['parution']
            };
            return res.send(obj);
        }
    }
    return res.send(500);
});

// création
app.post('/api/manga', (req, res) => {
    let obj = {
        id: parseInt(Liste[Liste.length - 1]['id']) + 1,
        titre: req.body.titre,
        auteur: req.body.auteur,
        tomes: req.body.tomes,
        parution: req.body.parution
    };
    Liste.push(obj);
    return res.send(obj);
});

// modification
app.put('/api/manga/:id', (req, res)=> {
    for (let i = 0; i < Liste.length; i++) {
        if (Liste[i]['id'] == req.params.id) {
            Liste[i]['id'] = req.body.id;
            Liste[i]['titre'] = req.body.titre;
            Liste[i]['auteur'] = req.body.auteur;
            Liste[i]['tomes'] = req.body.tomes;
            Liste[i]['parution'] = req.body.parution;
            let obj = {
                    id: req.body.id,
                    titre: req.body.titre,
                    auteur: req.body.auteur,
                    tomes: req.body.tomes,
                    parution: req.body.parution,
            };
            return res.send(obj);
        }
    }
    return res.sendStatus(500);
});

// suppression
app.delete('/api/manga/:id', (req, res) => {
    for (let i = 0; i < Liste.length; i++) {
        if (Liste[i]['id'] == req.params.id) {
            Liste.splice(i, 1);
            return res.sendStatus(200);
        }
    }
    return res.send(500);
});