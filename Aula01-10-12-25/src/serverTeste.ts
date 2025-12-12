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
    const id = req.params.id
    // Retorna uma mensagem usando o ID recebido
    res.json({
        mensagem: `Buscando usuário com o ID ${id}`
    })
})