import { Injectable } from '@nestjs/common';
import { loginDto, signUpDto } from '../dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(UserSchema.name) userModel)
  async signUp(signUpData: signUpDto): Promise<any> { }

  async login(loginData: loginDto): Promise<any> {
    const { email, password } = loginData;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
