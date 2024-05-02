import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, signUpDto } from "../dto/auth.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signUp(@Body() signUpData: signUpDto): Promise<any> {
    return this.authService.signUp(signUpData);
  }

  @Post()
  async logIn(@Body() loginData: loginDto): Promise<any> {
    return this.authService.logIn(loginData);
  }
}
