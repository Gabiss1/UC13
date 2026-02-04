import { usuarios, Usuario } from "../db/db";

type Callback<T> = (erro: Error | null, resultado?: T) => void;

export const UsuariosServiceCallback = {
    listar(cb: Callback<Usuario[]>){
        setTimeout(()=>{
            cb(null, usuarios)
        }, 400)
    },

    buscarPorId(id: number, cb: Callback<Usuario>){
        setTimeout(()=>{
            const user = usuarios.find((u)=> u.id === id)
            if (!user) return cb(new Error("Usuário não encontrado"))
            return cb(null,user)
        }, 400)
    },

    criar(nome: string, email: string, cb: Callback<Usuario>){
        if(!nome || nome.trim().length < 2){
            return cb(new Error("Nome inválido"))
        }
        if(!email || !email.includes("@")){
            return cb(new Error("Email inválido"))
        }
        const novoId = usuarios.length ? usuarios[usuarios.length -1].id + 1 : 1
        const novo: Usuario ={
            id: novoId,
            nome,
            email,
            ativo: true,
        }
        usuarios.push(novo)
        return cb(null, novo)
    }
}