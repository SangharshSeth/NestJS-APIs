import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from "../dto/auth.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signUp(@Body() signUpData: AuthDto): Promise<any> {
    return this.authService.signUp(signUpData);
  }

  @Post()
  async logIn(@Body() loginData: AuthDto): Promise<any> {
    return this.authService.login(loginData);
  }
}
