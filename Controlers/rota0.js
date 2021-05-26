module.exports = app  => { //exporta oq vem a seguir
    app.get('/', (req, res) => res.send('Você não esta em uma rota, use o /atendimentos')) //avisa que o client esta em uma rota não utilisada e solicita utilizar a rota /atendimentos
}