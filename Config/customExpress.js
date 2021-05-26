const express = require ('express')  //puxa o módulo express
const consign = require ('consign') //puxa o módulo consign
const bodyParser = require ('body-parser') //puxa o módulo bodyparses

module.exports = () => { //exporrta oq vêm a seguir

const app = express () //faz com q a api utilize o módulo express

app.use(bodyParser.urlencoded({extended: true})) //faz a api usar URLENCODED
app.use(bodyParser.json())  //faz a api usar .json

consign()
    .include('controlers')  //coloca as rotas criadas em CONTROLERS dentro da api
    .into(app)

    return app //retorna a api com os controlers inseridos
}


