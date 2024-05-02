import { Injectable } from '@nestjs/common';
import { loginDto, signUpDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  async signUp(signUpData: signUpDto): Promise<any> {}

  async login(loginData: loginDto): Promise<any> {
    const { email, password } = loginData;
  }
}
