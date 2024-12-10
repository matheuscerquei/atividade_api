require("dotenv").config();

const db = require("./db");
const express = require("express");

const app = express();

app.use(express.json());

app.post("/produto", (request, response) => {
    const nome = "nome 1";
    const preco = 12.60;
    const quantidade = 5;
    const categoria = "teste";

    const resultado = db.registraProduto(nome, preco, quantidade, categoria); // 3 - Inserir um novo produto;
    response.status(201).send(resultado);
});
app.post("/produto/", (request, response) => { // 1 - Consultar produtos;

    const resultado = db.listaProdutos();
    response.json(resultado);
});

app.post("/produto/id", (request, response) => { // 2 - Consultar um produto pelo id;

    const resultado = db.listaProduto(id);
    response.json(resultado);
});

app.post("/produto/:id", async (request, response) => { //4 - Alterar os dados do produto;
    const id = request.params.id;
    const { nome, preco, descricao } = request.body;

    try {
        const resultado = await atualizarProduto(id, { nome, preco, descricao });
        if (resultado.affectedRows > 0) {
            response.json({ message: "Produto atualizado com sucesso!" });
        } else {
            response.status(404).json({ message: "Produto não encontrado." });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Erro ao atualizar o produto." });
    }
});

app.delete("/produto/:id", async (request, response) => { // 5 - Deletar o produto.
    const id = request.params.id; 

    try {
        const resultado = await deletarProduto(id);
        if (resultado.affectedRows > 0) {
            response.json({ message: "Produto deletado com sucesso!" });
        } else {
            response.status(404).json({ message: "Produto não encontrado." });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Erro ao deletar o produto." });
    }
});

app.get("/", (request, response) => {
    response.json({
        message: "Está OK o Response!"
    })
});

app.listen(process.env.PORT, () => {
    console.log("App IS RUNNING!");
});