import { Controller, Post, Body, UseGuards, Req ,Get, HttpCode, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './interfaces/requestWithUser';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // signup api
  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  // login api
  @UseGuards(LocalAuthGuard) // 앞으로 strategy에 서술된 passport(보안된 로그인)를 사용예정의미
  // @UseGuards(AuthGuard('local'))
  @Post('/login')
  async loginUser(@Req() req:RequestWithUser) {
    const {user} = req
    //const user = await this.authService.loginUser(loginUserDto);
  const token = await this.authService.generateJwtAccessToken(user.id);
  return {user, token};
  }


  // 사용권한이 있는 애들만 정보갖고오게 하는거
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserInfo(@Req() req:RequestWithUser) {
    return req.user;
  }

  // 이메일 전송 API
  @Post("/email/send")
  async sendEmailVerification(@Body("email") email:string) {
    return await this.authService.sendEmailVerification(email)
  }


  // 이메일 인증번호 확인 API
  @Post("/email/check")
  async checkEmailVerification(@Body("email") email:string, @Body("code") code:string) {
    //return await this.authService.sendEmailTest(email)
    return await this.authService.checkedGenerateNumber(email, code)

  }

  
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async goodgleLogin() : Promise<any> {
      return HttpStatus.OK  
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() r:RequestWithUser) : Promise<any>  {
    const {user} = r
    const token = this.authService.generateJwtAccessToken(user.id)
    return {user, token}
  }


}
