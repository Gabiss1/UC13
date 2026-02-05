import { Request, Response } from "express";

import { UsuarioServiceAsync } from "../services/usuario.service.async";

    export const UsuarioControllerAsync = {
        async listar(req: Request, res: Response){
            try {
                const lista = await UsuarioServiceAsync.listar()
                return res.json(lista)
            } catch (erro: any) {
                return res.status(500).json({erro: erro.message})
            }
        },
        async buscar(req: Request, res: Response){
            try {
                const id = Number(req.params.id)
                const user = await UsuarioServiceAsync.buscarPorId(id)
                return res.json(user)
            } catch (erro: any) {
                return res.status(404).json({erro: erro.message})
            }
        },
        async criar(req: Request, res: Response){
            try {
                const {nome, email} = req.body
                const novo = await UsuarioServiceAsync.criar(nome, email)
                return res.status(201).json(novo)
            } catch (erro: any) {
                return res.status(400).json({erro: erro.message})
            }
        }
    }