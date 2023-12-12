import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/config.module';
import { PostModule } from './post/post.module';
import { EmailModule } from './email/email.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    AppConfigModule,
    ProductModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    PostModule,
    EmailModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
