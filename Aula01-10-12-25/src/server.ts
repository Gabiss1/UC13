// Importa o express e os tipos Request e Response de TS
// Express: Framework que facilita criar servidores HTTP;
// Request: representa a requisição que chega do cliente;
// Response: representa a resposta que vamos enviar.
import express, { Request, Response } from "express";

// Cria ima aplicação express
const app = express(); // A variável app é o nosso servidor
const PORT = 3000; // Define a porta onde o servidor vai rodar(3000)

// Middlewere para permitir que o servidor leia JSON no corpo das requisições
// sem isso o req.body não funciona
app.use(express.json());

/* 
Criaremos a rota GET no caminho "/"
Quando acessarmos: http:/localhost:3000/
vamos executar a função abaixo
req = dados enviados pelo clientes
res = objeto usado para responder ao cliente

Envia uma resposta em JSON para quem chamou a rota
*/
app.get("/", (req: Request, res: Response) => {
  res.json({ mensagem: "Servidor Express funcionando! 🚂" });
});

// Inicia o servidor e coloca ele para executar a porta definida
app.listen(PORT, () => {
  console.log(`💥 Servidor rodando em http://localhost:${PORT}`);
});

app.get("/sobre", (req: Request, res: Response)=>{
  res.json({
    "curso": "Desenvolvimento de Sistemas",
    "professora": "Dalvana",
    "versao": "1.0" 
  });
});

app.get("/hora", (req: Request, res: Response)=>{
  res.json({
    "hora": hora()
  });
});

app.get("/bemvindo/:nome", (req: Request, res: Response)=>{
  const nome = req.params

  res.json({
    nome
  })
});

function hora() {
  let hora = new Date().toLocaleTimeString("pt-BR");

  return hora;
}