const atendimentos = require('../models/atendimentos') //puxa os atendimentos do nosso modelo
const Atendimento = require('../models/atendimentos')

module.exports = app => { //exporta oq vem a seguir
    app.get('/atendimentos', (req, res) => {  // GET = busca algo, busca a lista de atendimentos
        Atendimento.lista(res) //devolve como resposta a lista de atendimentos utilziando o método lista
    })

    app.get('/atendimentos/:id', (req, res) => {  // busca um atendimento especifico com o id colocado apos a barra
        const id = parseInt(req.params.id) //definide o id como um número retirado do parametro id da requisição
        atendimentos.buscaPorId(id, res) //utiliza do métodoo buscaPorId pra procurar o id do atendimento
    })

    app.post('/atendimentos', (req, res) => { //POST = publciar algo, registra um novo atendimento
        const atendimento=  req.body  //define atendimento como o corpo/body da requisição
        Atendimento.adiciona(atendimento, res) //usa o método adiciona para adicionar esse atendimento preenchido no corpo/body da requisição
        })

    app.patch('/atendimentos/:id', (req, res) =>{ //PATCH = altera algo, altera uma parte do nosso atendimento deterrminado pelo id
        const id = parseInt(req.params.id) //define o id como um numero retirado do paremetro id da requisição
        const valores = req.body // define valores como o corpo/body da requisição
        Atendimento.altera(id, valores, res) //usa o metódo altera para alterar os valores do atendimento com o determinado id
    })

    app.delete('/atendimentos/:id', (req, res)=>{ //DELETE = deleta algo, deleta o deteminado atendimento com o id
        const id = parseInt(req.params.id) //define o id como um numero retirado do paremetro id da requisição
        Atendimento.deleta(id, res) // utiliza o método deleta de atendimento para excluir o atendimento com o ID 
    })
}