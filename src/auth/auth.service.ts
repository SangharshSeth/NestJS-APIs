import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from '../dto/auth.dto';
import { User } from './auth.schema'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Session } from '../session/session.schema';


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

  async login(loginData: AuthDto): Promise<any> {
    const { email, password } = loginData;
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (!existingUser) {
      throw new NotFoundException("User not found! Signup first.");
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      throw new UnauthorizedException("Wrong Password");
    }

    const sessionId = randomUUID();
    const createdAt = new Date();
    const expiresAt = new Date(createdAt);
    expiresAt.setHours(createdAt.getHours() + 1);
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
