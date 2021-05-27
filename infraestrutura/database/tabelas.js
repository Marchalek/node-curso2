class Tabelas { //cria a calsse Tabelas
    init(conexao) { //cria um método chamado init que requer um parametro conexao
        this.conexao = conexao //a conexão ta tabela(this.conexao) é definida como a conexao que é recebida como parametro do método init
        this.criarAtendimentos() //utiliza o método criarAtendimentos da classe Tabela 
        this.crairPets()
    }

    criarAtendimentos() {  //cria um método chamado criarAtendimentos que não requer parametros
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(11) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))' //da um comando de conexao sql para criar uma tabela chamada Atendimentos(caso não existnte) e passa os campos dessa tabela

        this.conexao.query(sql, (erro) => { //faz a conexão com o sql utilziando a conexao da classe tabela puxando o comanddo sql criado anteriormente e cololocando uma
            if(erro) {
                console.log(erro) //loga o erro no console se exitente
            }
            else {
                console.log('Tabela Atendimentos criada com suceso') //avisa na console que a tabela foi criada com sucesso se não tiver erros
            }
        })
    }

    crairPets() {
        const query = 'CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, nome varchar(50), imagem varchar (200), PRIMARY KEY (id))'

        this.conexao.query(query, erro => {
            if(erro){
                console.log(erro)
            } else {
                console.log("Tabela PET foi criada com sucesso")
            }
        })
    }
} 
module.exports = new Tabelas //exporta o módulo nova tabela