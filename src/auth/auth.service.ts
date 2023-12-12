import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadInterface } from './interfaces/tokenPayload.interface';
import { EmailService } from 'src/email/email.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager';



@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly emailService : EmailService,
    @Inject(CACHE_MANAGER) private cacheManager : Cache


  ) {}

  //회원가입 비지니스 로직
  async createUser(createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'something wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //로그인 비즈니스 로직
  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.findUserByEmail(loginUserDto.email);
    const isPasswordMatched = await user.checkPassword(loginUserDto.password);
    if (!isPasswordMatched) {
      throw new HttpException('password do not match', HttpStatus.BAD_REQUEST);
    }
    // if (user.password !== loginUserDto.password) {
    //   throw new HttpException(
    //     'password do not matched',
    //     HttpStatus.BAD_REQUEST,
    //   );
    //}
    return user;
  }

  //토큰 생성 로직
  public generateJwtAccessToken(userId: string) {
    const payload: TokenPayloadInterface = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}`,
    });
    return token;
  }


  async sendEmailVerification(email:string) {

    const generateNumber = this.generateOTP() 
    
    //번호 캐시에 저장 
    await this.cacheManager.set(email, generateNumber)


    await this.emailService.sendMail({
      to: email,
      subject : 'sungyeon_email verification',
      text : `this confirmation number is as follows. ${generateNumber}`

    })

    return "success"
  }

  async checkedGenerateNumber(email:string, code:string) {
    const number = await this.cacheManager.get(email)
    if (number !=code) throw new HttpException('not matched', HttpStatus.BAD_REQUEST)
    await this.cacheManager.del(email)
    return true
  }



  //랜덤 번호 자동 생성
  generateOTP() {
    let OTP = '';
    for (let i=1;i<=6; i++) {
      OTP += Math.floor(Math.random()*10)
    }
    return OTP;
  }

}
