import express from "express";
import { executarSQL } from "../database/index.js";
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        // Esse código busca todos os registros da tabela servicos e armazena o resultado em uma variável para posterior uso ou envio ao cliente.
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
        res.json({ mensagem: "Registro criado com sucesso!" });
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { nome } = req.body;
        await executarSQL(`update servicos set nome = '${nome}' where id = ${req.params.id};`);
        res.json({ mensagem: "Registro atualizado com sucesso!" });
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await executarSQL(`delete from servicos where id = ${req.params.id};`);
        res.json({ mensagem: "Registro deletado com sucesso!" });
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

export default router;