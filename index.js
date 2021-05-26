const customExpress = require("./Config/customExpress")  //puxa as configurações do arquivo custom express
const conexao = require("./infraestrutura/conexao") //puxa a configuração de conexão da  api
const Tabelas = require("./infraestrutura/tabelas") //puxa a configuração de tabelas do mysql
conexao.connect(erro => {  //faz a conexão
    if (erro) {
        console.log(erro)  //loga um erro no console caso não consia fazer a conexão
    }else {
        console.log('conectado com sucesso')
        
        Tabelas.init(conexao)  //cria uma tabela atendimento se não exitir
        const app = customExpress()  //faz com que a api execute nas configurações do express costumizado

        app.listen(3000, () => console.log('servidor rodando na porta 3000')) //faz com que a api "escuta" a porta 3000
    }
    
})

console.log("teste")


