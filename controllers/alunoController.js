const Aluno = require("../models/aluno.js");

const criarAluno = async (req, res) => {
  try {
    const { nome, idade } = req.body;

    const novoAluno = new Aluno({ nome, idade });

    await novoAluno.save();

    return res.status(201).json({
      message: "Aluno criado com sucesso!",
      aluno: novoAluno,
    });
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const obterTodosAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find().populate("perfil");

    if (!alunos || alunos.length === 0) {
      return res.status(404).json({ message: "Nenhum aluno encontrado." });
    }

    return res.status(200).json(alunos);
  } catch (error) {
    console.error("Erro ao obter alunos:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const deletarAluno = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await Aluno.deleteOne({ _id: id });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ message: "Aluno não encontrado." });
    }

    return res.status(200).json({ message: "Aluno removido com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar aluno:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const editarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idade } = req.body;

    const aluno = await Aluno.findByIdAndUpdate(id, { nome, idade });

    if (!aluno) {
      return res.status(404).json({ message: "Aluno não encontrado." });
    }

    return res.status(200).json({
      message: "Aluno atualizado com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao editar aluno:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = { criarAluno, obterTodosAlunos, deletarAluno, editarAluno };
