const conexao = require('../infraestrutura/conexao') //puxa o arquivo conexão para linkar com o servidor
const uploadDeArquivo = require('../arquivos/uploadDeArquivos') //puxa o módulo de upload de arquivos criado anteriormente
class Pet { //cria a calsse Pet
    adiciona(pet, res) { //método adiciona
        const query = 'INSERT INTO Pets SET ?' //comando sql

        uploadDeArquivo(pet.imagem, pet.nome, (erro, novocaminho) => { //função do aruqivo uploadDeArquivos
            if (erro) { //se tiver erro mostra no client
                res.status(400).json(erro)
            } else { //caso contrario roda o comando
                const novoPet = {nome: pet.nome, imagem: novocaminho } //define o novo pet como o nome : parametro nome, imagem : parametro imagem
                conexao.query(query, novoPet, (erro) => { //faz a conexão com o mysql, passa o comando sql, passa o parametro de novo pet e faz um callback pra erro
                    if (erro) { //se existir erro msotra no clinet
                        res.status(400).json(erro)
                    } else { //se obter succeso mostra o pet criado para o client com o caminho da imagem
                        res.status(200).json(novoPet)
                }
            })
            }
        })
       
    }
}

module.exports = new Pet()