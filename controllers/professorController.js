const Professor = require("../models/professor.js");

const criarProfessor = async (req, res) => {
  try {
    const { nome, idade, disciplinasIds } = req.body;

    const novoProfessor = new Professor({
      nome,
      idade,
      disciplinas: disciplinasIds,
    });

    await novoProfessor.save();

    return res.status(201).json({
      message: "Professor criado com sucesso!",
      professor: novoProfessor,
    });
  } catch (error) {
    console.error("Erro ao criar professor:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const obterTodosProfessores = async (req, res) => {
  try {
    const professores = await Professor.find().populate("disciplinas");

    if (professores.length === 0) {
      return res.status(404).json({ message: "Nenhum professor encontrado." });
    }

    return res.status(200).json(professores);
  } catch (error) {
    console.error("Erro ao obter professores:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const deletarProfessor = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await Professor.deleteOne({ _id: id });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ message: "Professor não encontrado." });
    }

    return res.status(200).json({ message: "Professor removido com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar professor:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const editarProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idade, disciplinasIds } = req.body;

    const professor = await Professor.findByIdAndUpdate(id, {
      nome,
      idade,
      disciplinas: disciplinasIds,
    });

    if (!professor) {
      return res.status(404).json({ message: "Professor não encontrado." });
    }

    return res.status(200).json({
      message: "Professor atualizado com sucesso!",
      professor,
    });
  } catch (error) {
    console.error("Erro ao editar professor:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = {
  criarProfessor,
  obterTodosProfessores,
  deletarProfessor,
  editarProfessor,
};
