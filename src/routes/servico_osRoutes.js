import express from "express";
import { executarSQL } from "../database/index.js";
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const vinculacoes = await executarSQL("select * from servicos_os;");
        
        for (const vinculo of vinculacoes) {
            const [servico] = await executarSQL(`select * from servicos where id = ${vinculo.servicos_id};`);
            vinculo.servico = servico;
        }
        
        res.json(vinculacoes);
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { os_servicos_id, servicos_id } = req.body;
        await executarSQL(`insert into servicos_os (os_servicos_id, servicos_id) values (${os_servicos_id}, ${servicos_id});`);
        res.json({ mensagem: "Registro criado com sucesso!" });
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { servicos_id } = req.body;
        await executarSQL(`update servicos_os set servicos_id = ${servicos_id} where id = ${req.params.id};`);
        res.json({ mensagem: "Registro atualizado com sucesso!"  });
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await executarSQL(`delete from servicos_os where id = ${req.params.id};`);
        res.json({ mensagem: "Registro deletado com sucesso!" });
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

export default router;