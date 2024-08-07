import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signUpData: AuthDto): Promise<any> {
    try {
      return await this.authService.signUp(signUpData);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Unexpected error during signup',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  async login(
    @Body() loginData: AuthDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const { data, message, status } = await this.authService.login(loginData);
      res.cookie('session_id', data.session_id, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      });
      return res.status(HttpStatus.OK).send({
        status: status,
        message: message,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Unexpected error during login ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
