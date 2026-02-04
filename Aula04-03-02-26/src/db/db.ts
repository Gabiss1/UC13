export type Usuario = {
    id: number
    nome: string
    email: string
    ativo: boolean
}

export const usuarios: Usuario[] = [
    {
        id: 1, nome: "Ana", email: "ana@email.com.br", ativo: true
    },
    {
        id: 2, nome: "Aquele Bruno", email: "barbruno@email.com.br", ativo: true
    },
    {
        id: 3, nome: "Henrytado", email: "tadoenry@email.com.br", ativo: true
    },
]