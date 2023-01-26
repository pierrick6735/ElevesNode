const express = require("express");
const app = express();
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const connection = require("express-myconnection");

const optionBd = {
    host : "localhost",
    user : "root",
    password : "",
    port : 3306,
    database : "elevesnode"
};

app.use(myConnection(mysql,optionBd,'pool'));

app.set("view engine", "ejs");
app.set("views", "IHM");

app.use('/public', express.static('public'));

app.use(express.urlencoded({extended:false}));


app.get('/', (req, res)=>{
    res.status(200).render('formulaire');
});

app.get('/tableau', (req, res)=>{
    req.getConnection((erreur, connection)=>{
        if(erreur){
            console.log(erreur);
        }else{
            connection.query('SELECT * FROM eleves', [], (erreur, resultat)=>{
                if(erreur){
                    console.log(erreur);
                }else{
                    res.status(200).render('tableau', {resultat});
                }
            })
        }
    })
});


app.post("/eleves", (req, res)=>{
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let telephone = req.body.telephone;

    req.getConnection((erreur, connection)=>{
        if(erreur){
            console.log(erreur);
        }else{
            connection.query('INSERT INTO eleves(id, nom, prenom, telephone) VALUES(?,?,?,?)',
            [null, nom, prenom, telephone], (erreur, resultat)=>{
                if(erreur){
                    console.log(erreur);
                }else{
                    res.status(300).redirect('/');
                }
            })
        }
    })
});


app.delete("/eleves/:id", (req, res)=>{
    let id = req.params.id;

    req.getConnection((erreur, connection)=>{
        if(erreur){
            console.log(erreur);
        }else{
            connection.query('DELETE FROM eleves WHERE id = ?', [id], (erreur, resultat)=>{
                if(erreur){
                    console.log(erreur);
                }else{
                    res.status(200).json({routeRacine : '/tableau'});
                }
            })
        }
    })
});


app.listen(3001);


