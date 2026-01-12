import express from "express";
import { executarSQL } from "../database/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        //Esse código busca todos os funcionários e, para cada um, busca o cargo correspondente na tabela cargos. Depois, adiciona esse cargo como propriedade do objeto funcionario. No final, retorna todos os funcionários em JSON.
        const funcionarios = await executarSQL("select * from funcionarios;");
        for (const funcionario of funcionarios) {
            const [cargo] = await executarSQL(`select * from cargos where id = ${funcionario.cargo_id};`);
            funcionario.cargo = cargo;
        }
        res.json(funcionarios);
    } catch (error) {
        res.json({ mensagem: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { cargo_id, nome, telefone, email, turno } = req.body;
        
        if(!cargo_id || !nome || !telefone || !email || !turno){
            throw new Error("Falta campos obrigatórios")
        }

        const comando = await executarSQL(`insert into funcionarios (cargo_id, nome, telefone, email, turno) values (${cargo_id}, '${nome}', '${telefone}', '${email}', '${turno}');`);
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
        const { cargo_id, nome, telefone, email, turno } = req.body;
        const [funcionario] = await executarSQL(`select * from funcionarios where id = ${req.params.id}`);

        if (cargo_id) {
            funcionario.cargo_id = cargo_id;
        }
        if (nome) {
            funcionario.nome = nome;
        }
        if (telefone) {
            funcionario.telefone = telefone;
        }
        if (email) {
            funcionario.email = email;
        }
        if (turno) {
            funcionario.turno = turno;
        }

        const comando = await executarSQL(`update funcionarios set cargo_id = ${funcionario.cargo_id}, nome = '${funcionario.nome}', telefone = '${funcionario.telefone}', email = '${funcionario.email}', turno = '${funcionario.turno}' where id = ${req.params.id};`);
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
        const comando = await executarSQL(`delete from funcionarios where id = ${req.params.id};`);
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