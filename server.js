// Usei o express para criar e configurar meu servidor
const express = require("express");
const server = express();

const db = require("./db");

// Configuração de arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

// Habilitanto uso do req.body
server.use(express.urlencoded({ extended: true }));

// Configuração do nunjucks
const nunjucks = require("nunjucks");

nunjucks.configure("views", {
    express: server,
    noCache: true,
});

// Criação de rota
server.get("/", function(req, res) {
    db.all(`SELECT * FROM ideias`, function(err, rows) {
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados!");
        }

        const reverseIdeias = [...rows].reverse();
        let lastIdeias = [];
            for (let idea of reverseIdeias) {
                if (lastIdeias.length < 2) {
                    lastIdeias.push(idea);
                }
            }
        return res.render("index.html", { ideias: lastIdeias });
    }) 
})

server.get("/ideias", function(req, res) {
    db.all(`SELECT * FROM ideias`, function(err, rows) {
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados!");
        }

        const reverseIdeias = [...rows].reverse();

        return res.render("ideias.html", { ideias: reverseIdeias });
    })
})

server.post("/", function(req, res) {
    const query = `
        INSERT INTO ideias(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
    `;

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ];

    db.run(query, values, function(err) {
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados!");
        }

        return res.redirect("/ideias");
    });
});

// Servidor ligado na porta 3000
server.listen(3000);
