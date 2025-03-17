const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./database/db.js");

const alunoRoutes = require("./routes/alunoRoutes.js");
const disciplinaRoutes = require("./routes/disciplinaRoutes.js");
const perfilRoutes = require("./routes/perfilRoutes.js");
const professorRoutes = require("./routes/professorRoutes.js");
const tarefaRoutes = require("./routes/tarefaRoutes.js");
const turmaRoutes = require("./routes/turmaRoutes.js");

const authRoutes = require("./routes/authRoutes.js");

const authenticateToken = require("./middleware/authenticateToken.js");

const app = express();
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

app.use("/api", authenticateToken);

app.use("/api", alunoRoutes);
app.use("/api", disciplinaRoutes);
app.use("/api", perfilRoutes);
app.use("/api", professorRoutes);
app.use("/api", tarefaRoutes);
app.use("/api", turmaRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});
