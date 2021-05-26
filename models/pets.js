const conexao = require('../infraestrutura/conexao')
const uploadDeArquivo = require('../arquivos/uploadDeArquivos')
class Pet {
    adiciona(pet, res) {
        const query = 'INSERT INTO Pets SET ?'

        uploadDeArquivo(pet.imagem, pet.nome, (erro, novocaminho) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                const novoPet = {nome: pet.nome, imagem: novocaminho }
                conexao.query(query, novoPet, (erro) => {
                    if (erro) {
                        res.status(400).json(erro)
                    } else {
                        res.status(200).json(novoPet)
                }
            })
            }
        })
       
    }
}

module.exports = new Pet()