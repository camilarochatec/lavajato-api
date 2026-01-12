import express from "express";
import { executarSQL } from "../database/index.js";
const router = express.Router();

router.get("/", async (req, res) => {
    //Esse comando busca todos os registros da tabela servicos_os e adiciona o nome do serviço correspondente, utilizando um INNER JOIN, retornando apenas os registros que possuem correspondência entre as duas tabelas.
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