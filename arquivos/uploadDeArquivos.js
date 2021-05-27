const fs = require('fs') //puxa o módulo fs utilizado para trabalhar com arquivos
const path = require('path') // puxao módulo path utilizado para trabalhar com caminhos

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => { //ria uma fonçao de  upload de arquivos
    const tiposValidos = ['jpg', 'png', 'jpeg'] //define os tipós de extensão validos
    const tipo = path.extname(caminho) //pega a extensão do arquivo
    const novocaminho = `./assets/imagens/${nomeDoArquivo}${tipo}` //define o novo caminho do arquivo que foi feito o upload
    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1 //cehaca se  o tipo do arquivo que deram upload é valido tirando o . da extensão (substring(1)) e comparando com o array de tipos validos

    if (tipoEhValido) { //se o tipo for válido executa
        fs.createReadStream(caminho) //cria um stream de leitura do arquivo 
            .pipe(fs.createWriteStream(novocaminho)) //transforma o fluxo legível em fluxo de gravação e joga isso no novo caminho do arquivo
            .on('finish', () => callbackImagemCriada(false, novocaminho)) //quando termina de gravar mostra o novo caminho para o client
    } else{ //se o tipo for invalido mostra a mensagem de erro na console e no client
        const erro = "tipo é invalido"
        console.log('Erro! Tipo inválido')
        callbackImagemCriada(erro)
    }

}