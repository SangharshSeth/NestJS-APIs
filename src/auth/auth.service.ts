import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { AuthDto } from '../dto/auth.dto';
import { Session } from '../session/session.schema';
import { User } from './auth.schema';


//TODO: Change types from any to proper return types

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>
  ) { }
  async signUp(signUpData: AuthDto): Promise<any> {
    const { email, password } = signUpData;
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ email, password: hashedPassword });
    await this.userRepository.save(newUser);
    return { message: 'User registered successfully' };
  }

  async login(loginData: AuthDto, existingSessionId: string): Promise<any> {
    const { email, password } = loginData;
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (!existingUser) {
      throw new NotFoundException("User not found! Signup first.");
    }

    //Check if user already logged in
    if(existingSessionId){
      console.log("User already exists")
      const session = await this.sessionRepository.findOneBy({
        user_id: existingUser.user_id
      })
      console.log(session.expires_at.getTime(), new Date().getTime());
      if(session && session.expires_at.getTime() > new Date().getTime()){
        console.log("good session");
        return {
          status: "success",
          message: "User already logged in",
          session_id: existingSessionId,
          expires_at: session.expires_at
        }
      }
      else{
        console.log("wrong session")
        await this.sessionRepository.delete({
          session_id: existingSessionId
        })
        return {
          status: "Forbidden",
          message: "Session has expired please relogin"
        }
      }
    }

    //Proceed with normal login
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      throw new UnauthorizedException("Wrong Password");
    }

    const sessionId = randomUUID();
    const createdAt = new Date();
    const expiresAt = new Date(createdAt);
    expiresAt.setMinutes(createdAt.getMinutes() + 5);
    const session = await this.sessionRepository.create({
      session_id: sessionId,
      created_at: createdAt,
      expires_at: expiresAt,
      user_id: existingUser.user_id,
      user: existingUser
    })

    await this.sessionRepository.save(session);

    return {
      status: 'SUCCESS',
      message: 'Login Successful',
      session_id: sessionId,
      expires_at: expiresAt
    };
  }

}
