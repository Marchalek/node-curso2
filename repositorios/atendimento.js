const query = require('../infraestrutura/database/queries')

class Atendimento {
    adiciona(atendimento) {
        const sql = 'INSERT INTO Atendimentos SET ?' //comando sql para inserir uma nova "tabela" dentro de Atenidmentos
        return query(sql, atendimento)
    }

    lista() {
        const sql = 'SELECT * FROM Atendimentos' //comando sql para selecionar todos os itens da tabela atendimentos
        return query(sql)
    }


}


module.exports  = new Atendimento