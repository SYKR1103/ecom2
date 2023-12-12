import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { User } from "src/user/entities/user.entity";

//로그인 검증

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {

 constructor(private authservice : AuthService) {

    // 다른언어에서는 상속받을때인데, 이거 역할뭐지??
    super({
        usernameField : 'email',
    })
 }

 async validate(email:string, password:string) : Promise<User> {
    return await this.authservice.loginUser({email, password})
 }

 //@Body() loginUserDto: LoginUserDto을 대신해서 서술됨



}
