import express from "express";
import { executarSQL } from "../database/index.js";
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const sql = `
            SELECT sos.*, s.nome as servico_nome
            FROM servicos_os sos
            JOIN servicos s ON sos.servicos_id = s.id;
        `;
        const comando = await executarSQL(sql);
        res.json(comando);
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { os_servicos_id, servicos_id } = req.body;
        await executarSQL(`insert into servicos_os (os_servicos_id, servicos_id) values (${os_servicos_id}, ${servicos_id});`);
        res.json({ mensagem: "Serviço vinculado à OS!" });
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { servicos_id } = req.body;
        await executarSQL(`update servicos_os set servicos_id = ${servicos_id} where id = ${req.params.id};`);
        res.json({ mensagem: "Vínculo de serviço atualizado!" });
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await executarSQL(`delete from servicos_os where id = ${req.params.id};`);
        res.json({ mensagem: "Serviço removido da OS!" });
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

export default router;