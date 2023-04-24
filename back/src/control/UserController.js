const UserModel = require('../model/users');

class UserController {

  async findUser(name, email) {
    const find = await UserModel.findOne({ name, email });
    if (find) {
      return false;
    } return res.status(200).json({ find });
  }

  async read(req, res) {
    const find = await UserModel.find();
    return res.status(200).json({ find });
  }

  async create(req, res) {
    const { name, email, password, dateOfBirth } = req.body;
    const find = await UserModel.findOne({ name });

    if (find) return res.status(400).json({
      message: "Já existe um usuário cadastrado com este nome",
      user: find,
    });

    const create = await UserModel.create({ name, email, password, dateOfBirth })

    return res.status(200).json({
      message: "Novo Usuário Cadastrado com sucesso",
      user: create});
  }

  async update(req, res) {
    const { id, name, email, password, dateOfBirth } = req.body;
    
    await UserModel.updateOne(
      { _id: id },
      { $set: { name, email, password, dateOfBirth } }
    );

    const find = await UserModel.findOne({ _id: id });

    return res.status(200).json({
      message: "Usuário alterado com sucesso",
      user: find,
    });
  }

  async remove(req, res) {
    await UserModel.deleteOne({ _id: req.body.id });
    return res.status(200).json({
      message: "Usuário removido com sucesso!",
    });
  }
}

module.exports = new UserController();