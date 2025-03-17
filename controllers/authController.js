const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, senha } = req.body;

  const fakeUser = {
    email: "test@example.com",
    senha: "senha123",
  };

  if (email !== fakeUser.email) {
    return res.status(404).json({ message: "Usuário não encontrado!" });
  }

  if (senha !== fakeUser.senha) {
    return res.status(401).json({ message: "Senha incorreta!" });
  }

  const payload = { id: fakeUser.id, email: fakeUser.email };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "10h",
  });

  return res.status(200).json({
    message: "Login bem-sucedido!",
    token: token,
  });
};

module.exports = { login };
