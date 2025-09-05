//importando os modulos
const express = require("express");
const cors = require("cors")

//criando a instancia da alicação
const app = express();

//definir a porta em q o servidor vai rodar

const port = 3001;
//configura o express para analisar requisições no corpo da pagina no formato JSON
app.use(express());
//habilita o Cors para todas as rotas da aplicação, permitindo acesso a outros dominios
app.use(cors());

//criando o objeto que servira como tabela

const precos ={
    bicicleta:1.10, //preço por km
    moto:1.50, //preço por km
    drone:2.50 //preço por km
}

//criando a função para rota calcular frete
app.post("/calcularfrete",(req,res)=>{
    //desesrutura o corpo da requisição para extrair dados
    const{distancia,tipoTransporte} = req.body

    //verifica se distancia ou tipo de transporte não forem validos na requisição

    if (distancia === undefined || tipoTransporte === undefined){
        return res.status(400).json({error:"Distancia e tipo de transporte são obrigatórios"})

    }

    const precoPorKm = [tipoTransporte.toLowerCase()];

    if(precoPorKm === undefined){
        return res.status(400).json({error:"Tipo de transporte invalido"})
    }
    //calculo para o valor total do frete
    const valorTotal = distancia * precoPorKm;

    //enviar a resposta como obj JSON e formato para trazer apenas duas casas decimais
    res.json({valorTotal: valorTotal.toFixed(2)})
})



//iniciando servidor para que possa escutar as requisiçoes
app.listen(port,()=>{
    console.log("servidor rodando na porta https://localhost:3001")
})