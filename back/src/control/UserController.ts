import UserService from '../service/UserService';
import { Request, Response } from 'express';
import { IUser, IEmail, IReqUser, IUserCreateRequest, IResponseCreateUser, ILogin } from '../interfaces/user';
import ValidationToken from '../ValidationToken';

export default class UserController {
  private userService: UserService;
  private validationToken: ValidationToken;

  constructor() {
    this.userService = new UserService();
    this.validationToken = new ValidationToken();
  }

  randomString = () => {
    var stringAleatoria = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 6; i += 1) {
      stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return stringAleatoria;
}

  findUser = async (req: Request, res: Response): Promise<Response> => {
    const { email: emailUser }: IUser = req.body;

    const find: IReqUser | false = await this.userService.findUser(emailUser);

    if (!find) return res.status(200).json({ message: "Usuário não encontrado" });
    
    const { _id, firstName, lastName, email, dateOfBirth } = find;

    return res.status(200).json({
      message: "Usuário localizado com sucesso",
      user: { _id, firstName, lastName, email, dateOfBirth },
    });
  };

  findByEmail = async (req: Request, res: Response): Promise<Response> => {
    const { email }: IEmail = req.body;
    const find: boolean = await this.userService.findByEmail(email);
    
    return res.status(200).json({
      exist: find,
    });
  };

  resetPassword = async (req: Request, res: Response): Promise<Response> => {
    const { email }: IEmail = req.body;
    try {
    const find: boolean = await this.userService.findByEmail(email);
      if (find) {
        const generate = this.randomString().toUpperCase();
        await this.userService.resetPassword(email, generate);
      } return res.status(200).json({ });
    } catch(error) {
      return res.status(200).json({ });
    }
  };

  changePassword = async (req: Request, res: Response): Promise<Response> => {
    const { email, password }: { email: string, password: string } = req.body;
    try {
    const change = await this.userService.resetPassword(email, password);
    if (change) {
      return res.status(200).json({ message: "Senha alterada com sucesso, redirecionando..." });
    } return res.status(200).json({ message: "Não foi possível alterar a senha do usuário" });
    } catch(error) {
      return res.status(200).json({ message: `Não foi possível alterar a senha do usuário (${error})` });
    }

  }

  authentication = (req: Request, res: Response): Response => {
    const { token }: { token: string } = req.body;

    const verifyUser: boolean = this.validationToken.verify(token);
    
    return res.status(200).json({
      auth: verifyUser,
    });

  };

  login = async (req: Request, res: Response): Promise<Response> => {
    const { email: emailUser, password }: ILogin = req.body;
    
    const find: IReqUser | false = await this.userService.login(emailUser, password);

    console.log(find)

    if (!find) return res.status(200).json({ message: "Usuário não encontrado" });
    
    const { _id, firstName, lastName, email, dateOfBirth } = find;

    const token: string = this.validationToken.generateToken(email, firstName, lastName, dateOfBirth);

    return res.status(200).json({
      message: "Usuário localizado com sucesso",
      user: { _id, firstName, lastName, email, dateOfBirth, token },
    });
  };

  read = async (req: Request, res: Response): Promise<Response> => {
    try {
      const find = await this.userService.read();
      return res.status(200).json({ users: find });
    } catch(error: any) {
      console.log('error', error);
      return res.status(404).json({ message: error });
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { email }: IUserCreateRequest = req.body;
    try {
      const find: IReqUser | false = await this.userService.findUser(email);
      if (find) {
        return res.status(200).json(find);
      }

      const create: IResponseCreateUser = await this.userService.create(req.body);

      const token: string = this.validationToken.generateToken(email, create.user.firstName, create.user.lastName, create.user.dateOfBirth);

      return res.status(200).json({
        message: create.message,
        user: {
          ...create.user,
          token,
        }
      });
    }
    catch(error) {
      return res.status(404).json({ message: error });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { _id }: IUser = req.body;
    try {
      await this.userService.update(req.body);
      const find: IReqUser | false = await this.userService.findById(_id);

      return res.status(200).json({
        message: "Dados do Usuário alterados com sucesso",
        user: find,
      });
    }
    catch(error) {
      return res.status(404).json({ message: error });
    }
  };

  remove = async (req: Request, res: Response): Promise<Response> => {
    const { _id }: IUser = req.body;
    try {
      const find: IReqUser | false = await this.userService.findById(_id);
      if (find) {
        await this.userService.remove(_id);
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
  };
}