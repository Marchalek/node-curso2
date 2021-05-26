const moment = require('moment') //puxa o módulo moment pra format
const conexao = require('../infraestrutura/conexao') //puxa a conexão 

class Atendimento { //cria uma classse chama atendimeno
    adiciona(atendimento, res) { //cria um método chamado adiciona pra adicionar um novo atendimento na tabela Atendimentos do mysql
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS') //puxa a data do sistema como a data da criação
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS') //definie o parametro data com o formato de datetime

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao) //checa se a data é valida verificando se data marcada é igual ou superior a data de criação do atendimento
        const clienteEhValido = atendimento.cliente.length >=5 //checa se o nome do cliente tem o mínimo de 5 caracteres para ser considerado valido

        const validacoes = [  //faz as validações das checagens em cima
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido) //conta o número de erros de acordo com o boolean do campo valido passado pra not (se for true que tem erro mostra como false e adiciona no contador que é o length)
        const existemErros = erros.length // checa se existem erros no atendimento verificando o contador erros
        if(existemErros) { //se exisitirem erros
            res.status(400).json(erros) //mostra pra o client o código http 400 de erro e mostra o erro pra ele
        } else {     // caso não exista erros
            const atendimentoDatado = {...atendimento, dataCriacao,data} //puxa os campos de atendimento mais os campos datacriacao e data

            const sql = 'INSERT INTO Atendimentos SET ?' //comando sql para inserir uma nova "tabela" dentro de Atenidmentos

            conexao.query(sql, atendimentoDatado, (erro, resultados) => { //faz a conexão usando o comando sql, os campos de atendimentoDatado e pede err e resultados
                if(erro) {
                    res.status(400).json(erro) //se existir erro mostra o erro para o client junto do código 400
                } else {
                    res.status(201).json(atendimento) //se obter sucesso retorna o atenidmento preenchido pelo client para o mesmo
                }
            })
        }
    }

    lista(res){ //cria um método para listar todos os atendimentos 
        const sql = 'SELECT * FROM Atendimentos' //comando sql para selecionar todos os itens da tabela atendimentos

        conexao.query(sql, (erro, resultados) => { //faz a conexao com o comando sql e pede erro e reulstados
            if (erro){ //se exisitr erro mostra o erro
                res.status(400).json(erro,)
            }else{ //se não houber erro mostra o resultado
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res){ //cria um método para buscar um atendimento específico por ID
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}` //comando sql para selecionar tudo da tabela atendimentos em que o id seja igual o id requisitado pelo client

        conexao.query(sql, (erro, resultados) => { //faz a conexao sql e pede erro ou resulatados
            const atendimento = resultados[0] //define que o atendimento requirido é só o primeiro resultado no array para não mostrar os colchetes
            if(erro){
                res.status(400).json(erro) // se houver erro mostra o erro para o cliente
            }else{
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