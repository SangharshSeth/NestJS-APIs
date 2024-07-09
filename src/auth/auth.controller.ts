import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from "../dto/auth.dto";
import { Response, response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signup(@Body() signUpData: AuthDto): Promise<any> {
    try {
      return await this.authService.signUp(signUpData);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Unexpected error during signup', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  async login(@Body() loginData: AuthDto, @Res() res: Response): Promise<any> {
    try {
      const { session_id, expires_at } =  await this.authService.login(loginData);
      res.cookie("session_id", session_id, {
        httpOnly: true,
        expires: expires_at,
        sameSite: "strict"
      })
      return res.status(HttpStatus.OK).json({
        "message": "Login Successful"
      })
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(`Unexpected error during login ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
