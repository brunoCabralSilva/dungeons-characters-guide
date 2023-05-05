import UserService from '../service/UserService';
import { Request, Response } from 'express';
import { IUser, IReqUser, IUserCreate, IResponseCreateUser } from '../interfaces/user';

export default class UserController {
  userService: UserService = new UserService();

  async findUser(req: Request, res: Response): Promise<Response> {
    const { email: emailUser }: IUser = req.body;

    const find: IReqUser | false = await this.userService.findUser(emailUser);

    if (!find) return res.status(200).json({ message: "Usuário não encontrado" });
    
    const { _id, name, email, dateOfBirth }: IReqUser = find;

    return res.status(200).json({
      message: "Usuário localizado com sucesso",
      user: { _id, name, email, dateOfBirth },
    });
  };

  async read(req: Request, res: Response): Promise<Response> {
    try {
      const find: IReqUser = await this.userService.read();
      return res.status(200).json({ users: find });
    } catch(error) {
      return res.status(404).json({ message: error });
    }
  };

  async create(req: Request, res: Response): Promise<Response> {
    const { email }: IUserCreate = req.body;
    try {
      const find: IReqUser | false = await this.userService.findUser(email);
      if (find) {
        return res.status(200).json(find);
      }
      const create: IResponseCreateUser = await this.userService.create(req.body);
      return res.status(200).json(create);
    }
    catch(error) {
      return res.status(404).json({ message: error });
    }
  };

  async update(req: Request, res: Response): Promise<Response> {
    const { id }: IUser = req.body;
    try {
      await this.userService.update(req.body);
      const find: IReqUser | false = await this.userService.findById(id);

      return res.status(200).json({
        message: "Dados do Usuário alterados com sucesso",
        user: find,
      });
    }
    catch(error) {
      return res.status(404).json({ message: error });
    }
  };

  async remove(req: Request, res: Response): Promise<Response> {
    const { id }: IUser = req.body;
    try {
      const find: IReqUser | false = await this.userService.findById(id);
      if (find) {
        await this.userService.remove(id);
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