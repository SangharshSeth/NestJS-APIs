import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { Session } from '../session/schema/session.schema';
import { User } from './schema/auth.schema';

//TODO: Change types from any to proper return types
interface SessionType {
  session_id: string;
  expires_at: Date;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  private async createSession(user: User): Promise<Session> {
    const sessionId = randomUUID();
    const createdAt = new Date();
    const expiresAt = new Date(createdAt);
    expiresAt.setMinutes(createdAt.getMinutes() + 5);
    const session = this.sessionRepository.create({
      session_id: sessionId,
      created_at: createdAt,
      expires_at: expiresAt,
      user_id: user.user_id,
      user: user,
    });

    return await this.sessionRepository.save(session);
  }
  async signUp(signUpData: AuthDto): Promise<{ message: string }> {
    const { email, password } = signUpData;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);
    return { message: 'User registered successfully' };
  }

  async login(
    loginData: AuthDto,
  ): Promise<{ status: string; message: string; data?: SessionType }> {
    const { email, password } = loginData;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (!existingUser) {
      throw new NotFoundException('User not found! Signup first.');
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong Password');
    }
    //Check if user already has a session established
    const hasActiveSession = await this.sessionRepository.findOneBy({
      user_id: existingUser.user_id,
    });

    if (hasActiveSession) {
      await this.sessionRepository.delete({
        user_id: existingUser.user_id,
      });
    }
    const session = await this.createSession(existingUser);
    return {
      status: 'Success',
      message: 'Login Successful',
      data: {
        session_id: session.session_id,
        expires_at: session.expires_at,
      },
    };
  }
}
