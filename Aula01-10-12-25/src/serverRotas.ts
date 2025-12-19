import express, { Request, Response, NextFunction } from "express";
// Next Function é um middleware para liberar a execução
const app = express(); 
const PORT = 3000;

class Jogador {
    nome: string
    id: number
    
    constructor(nome: string, id: number) {
        this.nome = nome
        this.id = id
    }

    getNome(): string{
        return this.nome
    }

    getId(): number{
        return this.id
    }

    setNome(nome: string): void{
        this.nome = nome
    }
}

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({ mensagem: "Servidor Express funcionando! 🚂" });
  });
  
app.listen(PORT, () => {
    console.log(`💥 Servidor rodando em http://localhost:${PORT}`);
});

// Cria uma array de strings
// simula um banco de dados em memória

const jogadores: Jogador[] = []

// jogadores.push(new Jogador("Gabiss", 1))
// jogadores.push(new Jogador("Buffon", 2))
// jogadores.push(new Jogador("Yago Raichu", 3))
// jogadores.push(new Jogador("Pelé", 4))

// Função middleware personalizada
// ela será executada ANTES das rotas

function logMiddleware(req: Request, // Dados da requisição
     res: Response, // Resposta do servidor
     next: NextFunction // Função que libera o fluxo
) {
    // Exibe no terminal o método HTTP e a rota acessada
    console.log(`${req.method} ${req.url}`)
    // Libera a requisição para continuar o fluxo
    next()
}

/**
 * Aplica o middleware para todas as rotas
 * Então, a partir de agora, toda a requisição que chegar no servidor passará primeiro pelo logMiddleware (sendo que ele vai verificar os dados direitinho entre a requisição e a rota).
 */

app.use(logMiddleware)

// GET - Listar/buscar usuários
// Define uma rota GET no caminho /usuario

app.get("/jogadores", (req: Request, res: Response, next: NextFunction)=>{
    res.json({
        total: jogadores.length, // Quantidade de jogadores cadastrados
        jogadores: jogadores // Lista completa de jogadores
    })
})

// ----------------------------
// POST - Cadastrar jogador    |
// ----------------------------

app.post("/jogadores", (req: Request, res: Response, next: NextFunction)=>{
    // Captura o nome enviado no corpo da requisição
    const nome = req.body.nome
    const id = req.body.id

    const novoJogador = new Jogador(nome, id)
    // Validação básica (verifica se o nome existe ou está vazio)

    if (!nome || nome.trim() === "") {
        return res.status(400).json({
            erro: "Nome é obrigatório"
        })
    }

    jogadores.push(novoJogador)

    res.json({
        mensagem: "Jogador cadastrado com sucesso!",
        jogadores: jogadores
    })
})

// ----------------------------
// PUT - Atualizar jogador     |
// ----------------------------

app.put("/jogador/:id", (req: Request, res: Response, next: NextFunction)=>{
    // Converter o parâmetro da URL para número
    const id = Number(req.params.id)-1
    // Captura o novo nome enviada no body
    const novoNome = req.body.nome
    // Verifica se existe usuário nesse índice
    if (!jogadores[id]) {
        return res.status(404).json({
            erro: "Jogador não encontrado"
        })
    }
    // Atualiza o usuário no Array
    console.log(novoNome)
    jogadores[id].setNome(novoNome)

    res.json({
        mensagem: "Jogador atualizado com sucesso!",
        jogadores: jogadores
    })
})

// ----------------------------
// DELETE - Deletar jogador    |
// ----------------------------
// Define uma rota DELETE com parâmetro :id (ele vai remover o elemento do index desse id do array)
app.delete("/jogadores/:id", (req: Request, res: Response, next: NextFunction)=>{
    // Converter o ID da URL para número
    const id = Number(req.params.id)
    // Verifica se o usuário existe
    // if (!jogadores[id-1]) {
    //     return res.status(404).json({
    //         erro: "Jogador não encontrado!"
    //     })
    // }


            let idEncotrado = jogadores.findIndex(jogador => jogador.id === id);
            jogadores.splice(idEncotrado, 1)
  

    res.json({
        mensagem: "Jogador removido com sucesso!",
        jogadores: jogadores
    })
})