const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./ws.db");

db.serialize(function() {
    // Criação da tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideias(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `);

    // Deletar dados da tabela -- Ainda a fazer
    /* db.run(`DELETE FROM ideias WHERE id = ?`, [], function(err) {
        if (err) return console.log(err);

        console.log("DELETEI", this);
    }); */

    // Consulta dos dados na tabela
    db.all(`SELECT * FROM ideias`, function(err, rows) {
        if (err) return console.log(err);

        console.log(rows);
    })
}) 

module.exports = db;