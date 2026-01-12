import express from "express";
import { executarSQL } from "../database/index.js";
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        //Esse comando retorna todos os pagamentos, trazendo também o status da Ordem de Serviço relacionada. Como é um INNER JOIN, apenas pagamentos que têm uma OS associada aparecem no resultado.
        const sql = `
            SELECT p.*, os.status_os as status_da_os
            FROM Pagamentos p
            JOIN os_servicos os ON p.os_servicos = os.id;
        `;
        const comando = await executarSQL(sql);
        res.json(comando);
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { os_servicos, valor_total, forma_pagamento, data_pagamento, numero_parcelas, status_pag, desconto, taxa_extra, observacoes } = req.body;
        await executarSQL(`insert into Pagamentos (os_servicos, valor_total, forma_pagamento, data_pagamento, numero_parcelas, status_pag, desconto, taxa_extra, observacoes) values (${os_servicos}, ${valor_total}, '${forma_pagamento}', '${data_pagamento}', ${numero_parcelas}, '${status_pag}', ${desconto}, ${taxa_extra}, '${observacoes}');`);
        res.json({ mensagem: "Registro criado com sucesso!" });
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { valor_total, forma_pagamento, status_pag } = req.body;
        const [pag] = await executarSQL(`select * from Pagamentos where id = ${req.params.id}`);
        if (valor_total) pag.valor_total = valor_total;
        if (forma_pagamento) pag.forma_pagamento = forma_pagamento;
        if (status_pag) pag.status_pag = status_pag;

        await executarSQL(`update pagamentos set valor_total = ${pag.valor_total}, forma_pagamento = '${pag.forma_pagamento}', status_pag = '${pag.status_pag}' where id = ${req.params.id};`);
        res.json({ mensagem: "Registro atualizado com sucesso!" });
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await executarSQL(`delete from pagamentos where id = ${req.params.id};`);
        res.json({ mensagem: "Registro deletado com sucesso!" });
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

export default router;