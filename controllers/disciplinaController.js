const Disciplina = require("../models/disciplina.js");
const Tarefa = require("../models/tarefa.js");

const criarDisciplina = async (req, res) => {
  try {
    const { nome, descricao, dataInicio, dataFim, tarefasIds } = req.body;

    const novaDisciplina = new Disciplina({
      nome,
      descricao,
      dataInicio,
      dataFim,
      tarefas: tarefasIds,
    });

    await novaDisciplina.save();

    await Tarefa.updateMany(
      { _id: { $in: tarefasIds } },
      { $push: { disciplinas: novaDisciplina._id } }
    );

    return res.status(201).json({
      message: "Disciplina criada com sucesso!",
      disciplina: novaDisciplina,
    });
  } catch (error) {
    console.error("Erro ao criar disciplina:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const obterTodasDisciplinas = async (req, res) => {
  try {
    const disciplinas = await Disciplina.find().populate("tarefas");

    if (disciplinas.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhuma disciplina encontrada." });
    }

    return res.status(200).json(disciplinas);
  } catch (error) {
    console.error("Erro ao obter disciplinas:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const deletarDisciplina = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await Disciplina.deleteOne({ _id: id });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ message: "Disciplina não encontrada." });
    }

    return res
      .status(200)
      .json({ message: "Disciplina removida com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar disciplina:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const editarDisciplina = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, dataInicio, dataFim, tarefasIds } = req.body;

    const disciplina = await Disciplina.findByIdAndUpdate(id, {
      nome,
      descricao,
      dataInicio,
      dataFim,
      tarefas: tarefasIds,
    });

    if (!disciplina) {
      return res.status(404).json({ message: "Disciplina não encontrada." });
    }

    return res.status(200).json({
      message: "Disciplina atualizada com sucesso!",
      disciplina,
    });
  } catch (error) {
    console.error("Erro ao editar disciplina:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = {
  criarDisciplina,
  obterTodasDisciplinas,
  deletarDisciplina,
  editarDisciplina,
};
