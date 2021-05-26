const fs = require('fs')
const path = require('path')

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    const tiposValidos = ['jpg', 'png', 'jpeg']
    const tipo = path.extname(caminho)
    const novocaminho = `./assets/imagens/${nomeDoArquivo}${tipo}`
    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1

    if (tipoEhValido) {
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novocaminho))
            .on('finish', () => callbackImagemCriada(false, novocaminho))
    } else{
        const erro = "tipo é invalido"
        console.log('Erro! Tipo inválido')
        callbackImagemCriada(erro)
    }

}