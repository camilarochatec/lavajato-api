import express from "express";
import { executarSQL } from "../database/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const veiculos = await executarSQL("select * from veiculos;");
        for (const veiculo of veiculos) {
            const [cliente] = await executarSQL(`select id, nome, telefone from clientes where id = ${veiculo.cliente_id};`);
            veiculo.cliente = cliente;
        }
        res.json(veiculos);
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { cliente_id, modelo, placa, cor, ano, marca, tipo_veiculo, observacoes, data_cadastro, status_pedido} = req.body;

        if (!cliente_id || !modelo || !placa || !cor || !ano || !marca || !tipo_veiculo || !observacoes ||!data_cadastro || !status_pedido) {
            throw new Error("Falta campos obrigatórios")
        }

        const comando = await executarSQL(`insert into veiculos (cliente_id, modelo, placa, cor, ano, marca, tipo_veiculo, observacoes, data_cadastro, status_pedido) values (${cliente_id}, '${modelo}', '${placa}', '${cor}', '${ano}', '${marca}', '${tipo_veiculo}', '${observacoes}', '${data_cadastro}', '${status_pedido}');`);

        if (comando.length == 0) {
            res.json({ mensagem: "Registro criado com sucesso!" });
        } else {
            res.json(comando);
        }
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { cliente_id, modelo, placa, cor, ano, marca, tipo_veiculo, observacoes, status_pedido } = req.body;
        const [veiculo] = await executarSQL(`select * from veiculos where id = ${req.params.id}`);

        if (!veiculo) {
           return res.status(404).json({ mensagem: "Veículo não encontrado" });
        }
        if (cliente_id) veiculo.cliente_id = cliente_id;
        if (modelo) veiculo.modelo = modelo;
        if (placa) veiculo.placa = placa;
        if (cor) veiculo.cor = cor;
        if (ano) veiculo.ano = ano;
        if (marca) veiculo.marca = marca;
        if (tipo_veiculo) veiculo.tipo_veiculo = tipo_veiculo;
        if (observacoes) veiculo.observacoes = observacoes;
        if (status_pedido) veiculo.status_pedido = status_pedido;

        const comando = await executarSQL(`update veiculos set cliente_id = ${veiculo.cliente_id}, modelo = '${veiculo.modelo}', placa = '${veiculo.placa}', cor = '${veiculo.cor}', ano = '${veiculo.ano}', marca = '${veiculo.marca}', tipo_veiculo = '${veiculo.tipo_veiculo}', observacoes = '${veiculo.observacoes}', status_pedido = '${veiculo.status_pedido}' where id = ${req.params.id};`);
        if (comando.length == 0) {
            res.json({ mensagem: "Registro atualizado com sucesso!" });
        } else {
            res.json(comando)
        }
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const comando = await executarSQL(`delete from veiculos where id = ${req.params.id};`);
        if (comando.length == 0) {
            res.json({ mensagem: "Registro deletado com sucesso!" });
        } else {
            res.json({ mensagem: "Linha não encontrada" })
        }
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

export default router;