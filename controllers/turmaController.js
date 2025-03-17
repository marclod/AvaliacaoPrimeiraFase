const Turma = require("../models/turma.js");

const criarTurma = async (req, res) => {
  try {
    const { nome, alunosIds, professorId } = req.body;

    const novaTurma = new Turma({
      nome,
      alunos: alunosIds,
      professor: professorId,
    });

    await novaTurma.save();

    return res.status(201).json({
      message: "Turma criada com sucesso!",
      turma: novaTurma,
    });
  } catch (error) {
    console.error("Erro ao criar turma:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const obterTodasTurmas = async (req, res) => {
  try {
    const turmas = await Turma.find().populate("alunos professor");

    if (turmas.length === 0) {
      return res.status(404).json({ message: "Nenhuma turma encontrada." });
    }

    return res.status(200).json(turmas);
  } catch (error) {
    console.error("Erro ao obter turmas:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const deletarTurma = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await Turma.deleteOne({ _id: id });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ message: "Turma não encontrada." });
    }

    return res.status(200).json({ message: "Turma removida com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar turma:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const editarTurma = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, alunosIds, professorId } = req.body;

    const turma = await Turma.findById(id);

    if (!turma) {
      return res.status(404).json({ message: "Turma não encontrada." });
    }

    turma.nome = nome;
    turma.alunos = alunosIds;
    turma.professor = professorId;

    await turma.save();

    return res.status(200).json({
      message: "Turma atualizada com sucesso!",
      turma,
    });
  } catch (error) {
    console.error("Erro ao editar turma:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = {
  criarTurma,
  obterTodasTurmas,
  deletarTurma,
  editarTurma,
};
