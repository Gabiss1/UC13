import express, { Request, Response, NextFunction, response} from "express";
const app = express();
const PORT = 3000;

app.use(express.json());

type Tarefa = {
    id: number
    titulo: string
    concluida: boolean
};

app.listen(PORT, () => {
    console.log(`💥 Servidor rodando em http://localhost:${PORT}`);
});

const tarefas: Tarefa[] = [
    {id: 1, titulo: "Procurar professor de inglês", concluida: false},
    {id: 2, titulo: "Estudar Express", concluida: true}
];

app.use((req: Request, res: Response, next: NextFunction) =>{
    console.log(`[LOG] ${req.method} ${req.url}`);
    next();
});

function validarTitulo(req: Request, res: Response, next: NextFunction) {
    const {titulo} = req.body;
    if (!titulo || String(titulo).trim() === "") {
        // Retorna 400 (Bad Resquest)
        return res.status(400).json({err: "O campo 'titulo' é obrigatório!!"});
    };
    // Se tudo está certo, segue a rota
    next();
};

app.get("/tarefas", (req: Request, res: Response) =>{
    const {concluida} = req.query;
    // Se o cliente não mandou query, devolvemos todas as tarefas
    if(concluida === undefined){
        return res.status(200).json(tarefas);
    };

    const concluidaBool = String(concluida) === "true";
    const filtradas = tarefas.filter((t) => t.concluida === concluidaBool)

    return res.status(200).json(filtradas);
});

app.get("/tarefas/:id", (req: Request, res: Response) =>{
    const {id} = req.params;
    const idNumero = Number(id);
    const tarefa = tarefas.find((t) => t.id === idNumero);
    if (!tarefa) {
        return res.status(404).json({ err: "Tarefa não encontrada!"})
    };

    return res.status(200).json(tarefa);
});

app.post("/tarefas", validarTitulo, (req: Request, res: Response) =>{
    const {titulo} = req.body;
    const novoId = tarefas.length > 0 ? tarefas [tarefas.length - 1].id + 1 : 1;
    const novaTarefa: Tarefa = {
        id: novoId,
        titulo: String(titulo),
        concluida: false,
    };
    tarefas.push(novaTarefa);
    return res.status(201).json(novaTarefa);
});