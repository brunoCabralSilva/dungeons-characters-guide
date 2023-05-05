import UserModel from '../model/userModel';
import md5 from 'md5';
import { IUser, IReqUser, IUserCreate, IResponseCreateUser } from '../interfaces/user';

class UserService {
  async findUser(emailUser: string) {
    const find: IUser = await UserModel.findOne({ emailUser });
    if (!find) return false;
    const { _id, name, email, dateOfBirth } = find;
    return { _id, name, email, dateOfBirth };
  };

  async findById(id: string) {
    const find: IUser = await UserModel.findOne({ _id: id });
    if (!find) return false;
    const { _id, name, email, dateOfBirth } = find;
    return { _id, name, email, dateOfBirth };
  };

  async read() {
    const find = await UserModel.find();
    if (find.length > 0) {
      const listOfUsers = find.map((user: string) => {
        const { _id, name, email, dateOfBirth }: = user;
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

  async create(user: string) {
    const { name, email, password, dateOfBirth } = user;
    const find = await UserModel.findOne({ email });

    if (find) {        
      const { _id, name, email, dateOfBirth } = find;
      return {
        message: "Já existe um usuário cadastrado com este nome",
        user: { _id, name, email, dateOfBirth },
      }
    }

    const create = await UserModel.create({ name, email, password: md5(password), dateOfBirth });
    return {
      message: "Novo Usuário Cadastrado com sucesso",
      user: {
        _id: create._id,
        name: create.name,
        email: create.email,
        dateOfBirth: create.dateOfBirth,
      },
    }
  };

  async update(user: string) {
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

  async remove(id: string) {
    await UserModel.deleteOne({ _id: id });
  }
}

export default UserService;