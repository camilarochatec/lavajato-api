import express from "express";
import cargoRoutes from "./src/routes/cargoRoutes.js";
import funcionarioRoutes from "./src/routes/funcionarioRoutes.js";
import clienteRoutes from "./src/routes/clienteRoutes.js";
import veiculoRoutes from "./src/routes/veiculoRoutes.js";
import servicoRoutes from "./src/routes/servicoRoutes.js";
import servico_osRoutes from "./src/routes/servico_osRoutes.js";
import osRoutes from "./src/routes/osRoutes.js";
import pagamentoRoutes from "./src/routes/pagamentoRoutes.js";


const app = express();

app.get('/', (req, res) => {
    res.send("Seja bem-vindo");
});

//middleware
app.use(express.json());
app.use('/cargos', cargoRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/clientes', clienteRoutes);
app.use('/veiculos', veiculoRoutes);
app.use('/servicos', servicoRoutes);
app.use('/servicos-os', servico_osRoutes);
app.use('/os', osRoutes);
app.use('/pagamentos', pagamentoRoutes);


app.use((req, res) => {
    res.status(404).json({
        mensagem: "Rota não encontrada"
    })
});

app.listen(3000, () => {
    console.log("Serviço on: http://localhost:3000");
});