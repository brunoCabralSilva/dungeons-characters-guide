const UserService = require('../service/UserService');

class UserController {

  async findUser(req, res) {
    const { name: nameUser, email: emailUser } = req.body;

    const find = await UserService.findUser(nameUser, emailUser);

    if (find) return res.status(200).json({ message: "Usuário não encontrado" });
    
    const { _id, name, email, dateOfBirth } = find;

    return res.status(200).json({
      message: "Usuário localizado com sucesso",
      user: { _id, name, email, dateOfBirth },
    });
  };

  async read(req, res) {
    try {
      const find = await UserService.read();
      return res.status(200).json({ users: find });
    } catch(error) {
      return res.status(404).json({ message: error });
    }
  };

  async create(req, res) {
    const { name, email } = req.body;
    try {
      const find = await UserService.findUser(name, email);
      if (find) {
        return res.status(200).json(find);
      }
      const create = await UserService.create(req.body);
      return res.status(200).json(create);
    }
    catch(error) {
      return res.status(404).json({ message: error });
    }
  };

  async update(req, res) {
    const { id } = req.body;
    try {
      await UserService.update(req.body);
      const find = await UserService.findById(id);

      return res.status(200).json({
        message: "Dados do Usuário alterados com sucesso",
        user: find,
      });
    }
    catch(error) {
      return res.status(404).json({ message: error });
    }
  };

  async remove(req, res) {
    const { id } = req.body;
    try {
      const find = await UserService.findById(id);
      if (find) {
        await UserService.remove(id);
        return res.status(200).json({
          message: "Usuário removido com sucesso!",
        });
      } else {
        return res.status(200).json({
          message: "Usuário inexistente",
        });
      }
    }
    catch(error) {
      return res.status(404).json({ message: error });
    }
  }
}

module.exports = new UserController();