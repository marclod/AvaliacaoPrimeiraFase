const Tarefa = require("../models/tarefa.js");

const criarTarefa = async (req, res) => {
  try {
    const { titulo, alunoId, disciplinasIds } = req.body;
    const concluida = false;

    const novaTarefa = new Tarefa({
      titulo,
      aluno: alunoId,
      concluida,
      disciplinas: disciplinasIds,
    });

    await novaTarefa.save();

    return res.status(201).json({
      message: "Tarefa criada com sucesso!",
      tarefa: novaTarefa,
    });
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const obterTodasTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.find()
      .populate("aluno")
      .populate("disciplinas");

    if (tarefas.length === 0) {
      return res.status(404).json({ message: "Nenhuma tarefa encontrada." });
    }

    return res.status(200).json(tarefas);
  } catch (error) {
    console.error("Erro ao obter tarefas:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const deletarTarefa = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await Tarefa.deleteOne({ _id: id });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }

    return res.status(200).json({ message: "Tarefa removida com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const editarTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, concluida } = req.body;

    const tarefa = await Tarefa.findByIdAndUpdate(id, { titulo, concluida });

    if (!tarefa) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }

    return res.status(200).json({
      message: "Tarefa atualizada com sucesso!",
      tarefa,
    });
  } catch (error) {
    console.error("Erro ao editar tarefa:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = {
  criarTarefa,
  obterTodasTarefas,
  deletarTarefa,
  editarTarefa,
};
