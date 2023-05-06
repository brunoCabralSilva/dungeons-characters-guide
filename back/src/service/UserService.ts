import UserModel from '../model/userModel';
import md5 from 'md5';
import { IUser, IReqUser, IUserCreateResponse, IResponseCreateUser } from '../interfaces/user';

export default class UserService {

  async findUser(emailUser: string): Promise<IReqUser | false>  {
    const find: IUser | null = await UserModel.findOne({ emailUser });
    if (!find) return false;
    const { _id, firstName, lastName, email, dateOfBirth } = find;
    return { _id, firstName, lastName, email, dateOfBirth };
  };

  async login(emailUser: string, passwordUser: string): Promise<IReqUser | false> {
    const find: IUser | null = await UserModel.findOne({ email: emailUser, password: md5(passwordUser) });

    if (!find) return false;
    const { _id, firstName, lastName, email, dateOfBirth } = find;
    return { _id, firstName, lastName, email, dateOfBirth };
  };

  async findByEmail(email: string): Promise<boolean> {
    const find: IUser | null = await UserModel.findOne({ email: email });
    if (!find) return false;
    return true;
  };

  async findById(idUser: string): Promise<IReqUser | false> {
    const find: IUser | null = await UserModel.findOne({ _id: idUser });
    if (!find) return false;
    const { _id, firstName, lastName, email, dateOfBirth } = find;
    return { _id, firstName, lastName, email, dateOfBirth };
  };

  async read(): Promise<IReqUser[]> {
    const find: IUser[] = await UserModel.find();
    if (find.length > 0) {
      const listOfUsers: IReqUser[] = find.map((user: IUser) => {
        const { _id, firstName, lastName, email, dateOfBirth } = user;
        return {
          _id,
          firstName,
          lastName,
          email,
          dateOfBirth,
        };
      });
      return listOfUsers;
    }
    return [];
  };

  async create(user: IUser): Promise<IResponseCreateUser> {
    const { firstName, lastName, email, password, dateOfBirth } = user;
    const find: IUser | null = await UserModel.findOne({ email });

    if (find) {        
      const { _id, firstName, lastName, email, dateOfBirth } = find;
      return {
        message: "Já existe um usuário cadastrado com este nome",
        user: { _id, firstName, lastName, email, dateOfBirth },
      }
    }

    const create: IUserCreateResponse = await UserModel.create({ firstName, lastName, email, password: md5(password), dateOfBirth });
    return {
      message: "Novo Usuário Cadastrado com sucesso",
      user: {
        _id: create._id,
        firstName: create.firstName,
        lastName: create.lastName,
        email: create.email,
        dateOfBirth: create.dateOfBirth,
      },
    }
  };

  async update(user: IUser): Promise<any> {
    const { _id: idUser, firstName, lastName, email, password, dateOfBirth } = user;
    
    await UserModel.updateOne(
      { _id: idUser },
      { $set: { firstName, lastName, email, password, dateOfBirth } },
    );

    const find: IUser | null = await UserModel.findOne({ _id: idUser });

    return {
      message: "Usuário alterado com sucesso",
      user: find,
    };
  };

  async remove(_id: string): Promise<void> {
    await UserModel.deleteOne({ _id: _id });
  }
}