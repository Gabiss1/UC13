import { usuarios, Usuario, delay } from "../db/db";

export const UsuarioServiceAsync = {
    async listar(): Promise<Usuario[]>{
        await delay(400)

        return usuarios
    },

    async buscarPorId(id: number): Promise<Usuario>{
        await delay(400)

        const user = usuarios.find((u) => u.id === id)
        if(!user) throw new Error("Usuário não encontrado")
        return user
    },

    async criar(nome: string, email: string): Promise<Usuario>{
        await delay(400)

        if(!nome || nome.trim().length < 2) throw new Error("Nome Inválido")
        if(!email || email.includes("@")) throw new Error("Email inválido")

        const novoId = usuarios.length ? usuarios[usuarios.length -1].id + 1 : 1

        const novo: Usuario = {
            id: novoId,
            nome,
            email,
            ativo: true
        }

        usuarios.push(novo)
        return novo
    }
}

