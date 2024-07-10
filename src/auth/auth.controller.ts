import { Body, Controller, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthDto } from "../dto/auth.dto";
import { AuthService } from './auth.service';

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
  async login(@Body() loginData: AuthDto, @Req() req: Request, @Res() res: Response): Promise<any> {
    try {
      let sessionId = "";
      if(req.cookies["session_id"] == undefined){
        console.log("No session_id in cookies")
        sessionId = "";
      }
      else{
        sessionId = req.cookies["session_id"];
        console.log("Session id :", sessionId)
      }
      console.log("Session id now", sessionId)

      const { session_id, expires_at, message } =  await this.authService.login(loginData, sessionId);
      res.cookie("session_id", session_id, {
        httpOnly: true,
        expires: expires_at,
        sameSite: "strict"
      })
      return res.status(HttpStatus.OK).json({
        "message": message
      })
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(`Unexpected error during login ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
