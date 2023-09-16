import { Body, Controller, Post } from '@nestjs/common';
import { LogInDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CustomExceptionFilter } from './dto/custom-exception.filter';
import { UseFilters } from '@nestjs/common';
import { SignUpDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @UseFilters(new CustomExceptionFilter())
  @Post('/login')
  async login(@Body() loginDTO: LogInDTO): Promise<{ access_token: string }> {
    const user = await this.authservice.validateUser(loginDTO);
    const token = await this.authservice.generateToken(user);
    return token;
  }
  @Post('/signup')
  async signup(
    @Body() signupDTO: SignUpDTO,
  ): Promise<{ access_token: string }> {
    await this.authservice.addUser(signupDTO);
    const user = await this.authservice.validateUser(signupDTO);
    const token = await this.authservice.generateToken(user);
    return token;
  }
}
