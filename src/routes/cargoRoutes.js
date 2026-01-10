import express from "express";
import { executarSQL } from "../database/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const comando = await executarSQL("select * from cargos;");
        res.json(comando);
    } catch (error) {
        res.json({mensagem: error.message});
    }
});

router.post("/", async (req, res) => {
    try {
        const comando = await executarSQL(`insert into cargos (nome) values ('${req.body.nome}');`);
        if(comando.length == 0){
            res.json({mensagem: "Registro criado com sucesso!"});
        }else{
            res.json({mensagem: comando});
        }
    } catch (error) {
        res.json({mensagem: error.message});
    }
});

router.put("/:id", async (req, res) => {
    try {
        const comando = await executarSQL(`update cargos set nome = '${req.body.nome}' where id = ${req.params.id};`);
        if(comando.length == 0){
            res.json({mensagem: "Registro atualizado com sucesso!"});
        }else{
            res.json({mensagem: comando})
        }
    } catch (error) {
        res.json({mensagem: error.message});
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const comando = await executarSQL(`delete from cargos where id = ${req.params.id};`);
        if(comando.length == 0){
            res.json({mensagem: "Registro deletado com sucesso!"});
        }else{
            res.json({mensagem: "Linha não encontrada"});
        }
    } catch (error) {
        res.json({mensagem: error.message});
    }
});

export default router;