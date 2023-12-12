import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback, Profile } from "passport-google-oauth2";
import { Provider } from "src/user/entities/provider.enum";
import { AuthService } from "../auth.service";
import { UserService } from "src/user/user.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";




@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(
    Strategy,
    Provider.Google) {

        constructor(
            private readonly configService : ConfigService,
            private readonly authService : AuthService,
            private readonly userService : UserService

        ) {

            super({

                clientID :  configService.get('GOOGLE_AUTH_CLIENTID'),
                clientSecret : configService.get('GOOGLE_AUTH_CLIENT_SECRET'),
                callbackURL : configService.get('GOOGLE_AUTH_CALLBACK_URL'),    
                scope : ['profile', 'email']
            })
        }

        async validate(
            _accesstoken : string,
            _refereshtoken : string,
            profile : any,
            done : VerifyCallback,
  
        ) : Promise<any> {

            const { provider, displayName, email, photos } = profile

            //1. 가입 안되었을때 
            try {

                const user = await this.userService.findUserByEmail(email)

                if (user.provider !== provider) {
                    throw new HttpException('xxxx', HttpStatus.BAD_REQUEST)
                }
                done(null, user)

            } catch(e) {

                console.log(e)
                if (e.status === 404) {
                    const newuser = {
                        email,
                        nickname : displayName,
                        provider,
                        photoImage : photos[0].value
                      }
                    await this.userService.createUser(newuser)
                    done(null, newuser)
                    
                }

            }

        }

    }