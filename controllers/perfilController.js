const Perfil = require("../models/perfil.js");
const Aluno = require("../models/aluno.js");

const criarPerfil = async (req, res) => {
  try {
    const { matricula, telefone, endereco, alunoId } = req.body;

    const novoPerfil = new Perfil({
      matricula,
      telefone,
      endereco,
      aluno: alunoId,
    });

    await novoPerfil.save();

    await Aluno.updateOne(
      { _id: alunoId },
      { $set: { perfil: novoPerfil._id } }
    );

    return res.status(201).json({
      message: "Perfil criado com sucesso!",
      perfil: novoPerfil,
    });
  } catch (error) {
    console.error("Erro ao criar perfil:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const obterTodosPerfis = async (req, res) => {
  try {
    const perfis = await Perfil.find().populate("aluno");

    if (perfis.length === 0) {
      return res.status(404).json({ message: "Nenhum perfil encontrado." });
    }

    return res.status(200).json(perfis);
  } catch (error) {
    console.error("Erro ao obter perfis:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const deletarPerfil = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await Perfil.deleteOne({ _id: id });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ message: "Perfil não encontrado." });
    }

    return res.status(200).json({ message: "Perfil removido com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar perfil:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const editarPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const { matricula, telefone, endereco, alunoId } = req.body;

    const perfil = await Perfil.findByIdAndUpdate(id, {
      matricula,
      telefone,
      endereco,
      aluno: alunoId,
    });

    if (!perfil) {
      return res.status(404).json({ message: "Perfil não encontrado." });
    }

    return res.status(200).json({
      message: "Perfil atualizado com sucesso!",
      perfil,
    });
  } catch (error) {
    console.error("Erro ao editar perfil:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = { criarPerfil, obterTodosPerfis, deletarPerfil, editarPerfil };
