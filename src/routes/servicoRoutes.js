import express from "express";
import { executarSQL } from "../database/index.js";
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const comando = await executarSQL("select * from servicos;");
        res.json(comando);
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { nome } = req.body;
        await executarSQL(`insert into Servicos (nome) values ('${nome}');`);
        res.json({ mensagem: "Serviço criado no catálogo!" });
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { nome } = req.body;
        await executarSQL(`update servicos set nome = '${nome}' where id = ${req.params.id};`);
        res.json({ mensagem: "Serviço atualizado!" });
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await executarSQL(`delete from servicos where id = ${req.params.id};`);
        res.json({ mensagem: "Serviço deletado!" });
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

export default router;