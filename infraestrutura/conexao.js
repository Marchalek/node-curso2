const mysql = require ('mysql') //puxa o móulo mysql para o programa

const conexao = mysql.createConnection({ //cria uma conexão de mysql
    host: 'localhost', //quem vai ser o host da conexão
    port: 3306,  //porta da conexão
    user: 'root', //usaurio
    password: 'admin',  //senha
    database: 'agenda-petshop', //nome do baco de dados
})

module.exports = conexao //exporta essa conexao