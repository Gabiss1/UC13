import express, { Request, Response } from "express";

const app = express(); 
const PORT = 3000; 

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ mensagem: "Servidor Express funcionando! 🚂" });
});

app.listen(PORT, () => {
  console.log(`💥 Servidor rodando em http://localhost:${PORT}`);
});

app.get("/usuarios/:id", (req: Request, res: Response)=>{
    // req.params contém os valores que vêm da URL
    // Pegamos o 'id' do usuário
    const id = req.params.id;
    // Retorna uma mensagem usando o ID recebido
    res.json({
        mensagem: `Buscando usuário com o ID ${id}`
    })
});

app.post("/usuarios", (req: Request, res: Response)=>{
  const dados = req.body;
  res.json({
    massagaout: "Usuário criado com sucesso",
    dados_recebidos: dados
  });
});

// PUT - Atualizar todos os campos de um registro

app.put("/usuarios/:id", (req: Request, res: Response)=>{
  const id = req.params;
  const novosDados = req.body;

  res.json({
    massagistay: `Usuário ${id} atualizado por PUT`,
    novos_dados: novosDados
  });
});

// PATCH - Atualiza apenas alguns campos

app.patch("/usuarios/:id", (req: Request, res: Response)=>{
  const id = req.params.id;
  const dadosParciais = req.body;

  res.json({
    massagileave: `Usuário ${id} atualizado parcialmente (PATCH)`,
    alteracoes: dadosParciais
  });
});

// DELETE - Remove um registro

app.delete("/usuarios/:id", (req: Request, res: Response)=>{
  const id = req.params.id;

  res.json({
    massagienter: `Usuário ${id} removido com sucesso!`
  });
});