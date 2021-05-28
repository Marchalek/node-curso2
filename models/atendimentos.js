const { default: axios } = require('axios')
const moment = require('moment') //puxa o módulo moment pra format
const conexao = require('../infraestrutura/database/conexao') //puxa a conexão 
const repositorio = require ('../repositorios/atendimento') //puxa o repositorio

class Atendimento { //cria uma classse chama atendimeno
    constructor () {
        this.dataEhValida =({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao) //checa se a data é valida verificando se data marcada é igual ou superior a data de criação do atendimento
        this.clienteEhValido = ({tamanho}) => tamanho >=5 //checa se o nome do cliente tem o mínimo de 5 caracteres para ser considerado valido

        this.valida = parametros => this.validacoes.filter(campo =>{
            const {nome} = campo
            const parametro = parametros[nome]

            return !campo.valido(parametro)
        })

        this.validacoes = [  //faz as validações das checagens em cima
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
    }
    
    adiciona(atendimento) { //cria um método chamado adiciona pra adicionar um novo atendimento na tabela Atendimentos do mysql

        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS') //puxa a data do sistema como a data da criação
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS') //definie o parametro data com o formato de datetime

        const parametros = {
            data: {data, dataCriacao},
            cliente: {tamanho : atendimento.cliente.length }
        }

        const erros = this.valida(parametros)
        const existemErros = erros.length // checa se existem erros no atendimento verificando o contador erros

        if(existemErros) { //se exisitirem erros
            return new Promise((resolve, reject) => reject(erros))
        } else {     // caso não exista erros
            const atendimentoDatado = {...atendimento, dataCriacao,data} //puxa os campos de atendimento mais os campos datacriacao e data

            return repositorio.adiciona(atendimentoDatado).then(resultados => {
                    const id = resultados.insertId
                    return ({...atendimento, id})
                })
        }
    }

    lista(){ //cria um método para listar todos os atendimentos 
        return repositorio.lista
    }

    buscaPorId(id, res){ //cria um método para buscar um atendimento específico por ID
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}` //comando sql para selecionar tudo da tabela atendimentos em que o id seja igual o id requisitado pelo client

        conexao.query(sql, async (erro, resultados) => { //faz a conexao sql e pede erro ou resulatados
            const atendimento = resultados[0] //define que o atendimento requirido é só o primeiro resultado no array para não mostrar os colchetes
            const cpf = atendimento.cliente //define o cpf como o campo cliente do atendimento
            if(erro){
                res.status(400).json(erro) // se houver erro mostra o erro para o cliente
            }else{
                const { data } = await axios.get(`http://localhost:8082/${cpf}`) // data =cliente com cpf ///// busca o cliente com o cpf com o uso de uma outra api
                atendimento.cliente = data // define o parametro cliente do atenimento como o cliente com o determinado cpf achado na outra api
                res.status(200).json(atendimento) //se não houver erro mostra o atendimento requisitado pelo cliente
            }
        })
    }

    altera(id, valores, res){ //cria um método para alterar valores de um atendimento especifico com o id requsitado pelo client
        if(valores.data) { //checa se o valor q quer ser mechido é a data
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS') //se o valor q quer ser mechido for data coloca ele no formato date time
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?' //comando sql para "upddatear"(alterar) a tabela atendimentos em que o atendimento bata com o id requisitado

        conexao.query(sql, [valores, id], (erro, resultados) =>{ //faz a conexao com o comano sql, manda os valores e o id para o mysql e busca erro ou resultaos
            if(erro){
                res.status(400).json(erro) //se tiver erros mostra o erro para o client
            }else{
                res.status(200).json({...valores, id}) // se tiver sucesso mostra os valores alterarod e o id do atenimento
            }
        })
    }

    deleta(id, res){ //cria um método para deletar um  atendimento que bata com o id requistado pelo client
        const sql = 'DELETE FROM Atendimentos WHERE id=?' //comando sql para deletar  o atendimento da Tabela Atendimentos que bata com o id requisitado

        conexao.query(sql, id, (erro, resultados) => { //conecta com o comando sql manda o id e busca erro ou resultados
            if(erro){
                res.status(400).json(erro) //se houver erros mostra eles para o client
            } else{
                res.status(200).json({id}) //se obter sucesso mostra o id do atendimento deletado
            }
        }) 
    }
}
module.exports = new Atendimento //exporta o módulo como um novo atendimento