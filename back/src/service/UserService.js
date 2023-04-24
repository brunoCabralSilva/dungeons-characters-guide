const UserModel = require('../model/users');

class UserService {

  async findUser(nameUser, emailUser) {
    const find = await UserModel.findOne({ nameUser, emailUser });
    if (!find) return false;
    const { _id, name, email, dateOfBirth } = find;
    return { _id, name, email, dateOfBirth };
  };

  async findById(id) {
    const find = await UserModel.findOne({ _id: id });
    if (!find) return false;
    const { _id, name, email, dateOfBirth } = find;
    return { _id, name, email, dateOfBirth };
  };

  async read() {
    const find = await UserModel.find();
    if (find.length > 0) {
      const listOfUsers = find.map((user) => {
        const { _id, name, email, dateOfBirth } = user;
        return {
          _id,
          name,
          email,
          dateOfBirth,
        };
      });
      return listOfUsers;
    }
    return [];
  };

  async create(user) {
    const { name, email, password, dateOfBirth } = user;
    const find = await UserModel.findOne({ name });

    if (find) {        
      const { _id, name, email, dateOfBirth } = find;
      return {
        message: "Já existe um usuário cadastrado com este nome",
        user: { _id, name, email, dateOfBirth },
      }
    }

    const create = await UserModel.create({ name, email, password, dateOfBirth });
    return {
      message: "Novo Usuário Cadastrado com sucesso",
      user: {
        id: create._id,
        name: create.name,
        email: create.email,
        dateOfBirth: create. dateOfBirth,
      },
    }
  };

  async update(user) {
    const { id, name, email, password, dateOfBirth } = user;
    
    await UserModel.updateOne(
      { _id: id },
      { $set: { name, email, password, dateOfBirth } },
    );

    const find = await UserModel.findOne({ _id: id });

    return {
      message: "Usuário alterado com sucesso",
      user: find,
    };
  };

  async remove(id) {
    await UserModel.deleteOne({ _id: id });
  }
}

module.exports = new UserService();