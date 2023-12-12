import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LocalAuthStrategy } from './strategies/local-auth.strategy';
import { JwtAuthStrategy } from './strategies/jwt-auth-strategy';
import { EmailModule } from 'src/email/email.module';
import { GoogleAuthStrategy } from './strategies/google-auth.strategy';

@Module({
  imports: [ConfigModule, JwtModule.register({}), UserModule, EmailModule],
  controllers: [AuthController],
  providers: [AuthService, LocalAuthStrategy, JwtAuthStrategy, GoogleAuthStrategy],
})
export class AuthModule {}
