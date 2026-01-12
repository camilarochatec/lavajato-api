import express from "express";
import { executarSQL } from "../database/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        //Esse código busca todos os clientes e, para cada cliente, executa uma nova consulta para buscar os veículos associados a ele. Em seguida, adiciona a lista de veículos ao objeto do client
        const clientes = await executarSQL("select * from clientes;");
        for (const cliente of clientes) {
            const [veiculos] = await executarSQL(`select * from veiculos where cliente_id = ${cliente.id};`);
            cliente.veiculos = veiculos;
        }
        res.json(clientes);
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { nome, telefone, email, cpf, rua, bairro, numero_casa } = req.body;
        
        if( !nome || !telefone || !email || !cpf || !rua || !bairro || !numero_casa ){
            throw new Error("Falta campos obrigatórios")
        }

        const comando = await executarSQL(`insert into clientes (nome, telefone, email, cpf, rua, bairro, numero_casa) values ('${nome}', '${telefone}', '${email}', '${cpf}', '${rua}', '${bairro}', '${numero_casa}');`);
        if (comando.length == 0) {
            res.json({ mensagem: "Registro criado com sucesso!" });
        }else{
            res.json(comando);
        }
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { nome, telefone, email, cpf, rua, bairro, numero_casa } = req.body;
        const [cliente] = await executarSQL(`select * from clientes where id = ${req.params.id}`);

        if (nome) {
            cliente.nome = nome;
        }
        if (telefone) {
            cliente.telefone = telefone;
        }
        if (email) {
            cliente.email = email;
        }
        if (cpf) {
            cliente.cpf = cpf;
        }
        if (rua) {
            cliente.rua = rua;
        }
        if (bairro) {
            cliente.bairro = bairro;
        }
        if (numero_casa) {
            cliente.numero_casa = numero_casa;
        }

        const comando = await executarSQL(`update clientes set nome = '${cliente.nome}', telefone = '${cliente.telefone}', email = '${cliente.email}', cpf = '${cliente.cpf}', rua = '${cliente.rua}', bairro = '${cliente.bairro}', numero_casa = '${cliente.numero_casa}' where id = ${req.params.id};`);
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
        const comando = await executarSQL(`delete from clientes where id = ${req.params.id};`);
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