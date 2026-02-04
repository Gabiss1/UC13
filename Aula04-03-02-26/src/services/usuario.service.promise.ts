import { resolve } from "dns";
import { usuarios, Usuario } from "../db/db";

export const UsuarioServicePromise = {
  listar(): Promise<Usuario[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(usuarios);
      }, 400);
    });
  },

  buscarPorId(id: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = usuarios.find((u) => u.id === id);
        if (!user) return reject(new Error("Usuário não encontrado"));
        resolve(user);
      }, 400);
    });
  },

  criar(nome: string, email: string): Promise<Usuario> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!nome || nome.trim().length < 2)
          return reject(new Error("Nome Inválido"));
        if (!email || email.includes("@"))
          return reject(new Error("Email Inválido"));
        const novoId = usuarios.length
          ? usuarios[usuarios.length - 1].id + 1
          : 1;
        const novo: Usuario = {
          id: novoId,
          nome,
          email,
          ativo: true,
        };
        usuarios.push(novo);
        resolve(novo);
      }, 400);
    });
  },
};
