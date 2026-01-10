import express from "express";
import { executarSQL } from "../database/index.js";
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const sql = `
            SELECT os.*, f.nome as funcionario_nome, v.modelo as veiculo_modelo, v.placa as veiculo_placa
            FROM OS_Servicos os
            LEFT JOIN funcionarios f ON os.funcionario_id = f.id
            LEFT JOIN veiculos v ON os.veiculo_id = v.id;
        `;
        const comando = await executarSQL(sql);
        res.json(comando);
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { funcionario_id, veiculo_id, data, valor_total, status_os, observacoes } = req.body;
        const comando = await executarSQL(`insert into os_servicos (funcionario_id, veiculo_id, data, valor_total, status_os, observacoes) values (${funcionario_id}, ${veiculo_id}, '${data}', ${valor_total}, '${status_os}', '${observacoes}');`);
        res.json({ mensagem: "OS criada com sucesso!" });
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { funcionario_id, veiculo_id, data, valor_total, status_os, observacoes } = req.body;
        const [os] = await executarSQL(`select * from os_servicos where id = ${req.params.id}`);
        if (funcionario_id) os.funcionario_id = funcionario_id;
        if (veiculo_id) os.veiculo_id = veiculo_id;
        if (data) os.data = data;
        if (valor_total) os.valor_total = valor_total;
        if (status_os) os.status_os = status_os;
        if (observacoes) os.observacoes = observacoes;

        await executarSQL(`update os_servicos set funcionario_id = ${os.funcionario_id}, veiculo_id = ${os.veiculo_id}, data = '${os.data}', valor_total = ${os.valor_total}, status_os = '${os.status_os}', observacoes = '${os.observacoes}' where id = ${req.params.id};`);
        res.json({ mensagem: "OS atualizada!" });
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await executarSQL(`delete from os_servicos where id = ${req.params.id};`);
        res.json({ mensagem: "OS deletada!" });
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

export default router;