import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

interface IJwtConfig {
  expiresIn: string,
  subject: string,
}

interface IPayload {
  firstName: string,
  lastName: string,
  email: string,
  dateOfBirth: string,
}

export default class ValidationToken {
  private payload: IPayload;
  private jwtSecret: string;
  private jwtConfig: IJwtConfig;

  constructor() {

    this.jwtConfig = {
      expiresIn: '120min',
      subject: '1',
    };

    this.payload = {
      email: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
    };

    this.jwtSecret = process.env.JWT_SECRET || 'Isopotametemumdomsani618';
  }
  
  generateToken = (email: string, firstName: string, lastName: string, dateOfBirth: string): string => {
    this.payload = { email, firstName, lastName, dateOfBirth };
    const json = jwt.sign(this.payload, this.jwtSecret, this.jwtConfig);
    return json;
  };

  verify = (token: string): boolean => {
    try {
      const ver = jwt.verify(token, this.jwtSecret);
      if (ver) { return true }
      return false;
    } catch( error) {
      return false;
    }
  }
};