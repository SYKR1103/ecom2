import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),


        
        EMAIL_SERVICE : Joi.string().required(),
        EMAIL_USER : Joi.string().required(),
        EMAIL_PASSWORD : Joi.string().required(),

        REDIS_HOST :Joi.string().required(),
        REDIS_PORT :Joi.number().required(),
        REDIS_USER :Joi.string().required(),
        REDIS_PASSWORD :Joi.string().required(), 
        REDIS_TTL : Joi.number().required(),

        GOOGLE_AUTH_CLIENTID :Joi.string().required(), 
        GOOGLE_AUTH_CLIENT_SECRET  :Joi.string().required(), 
        GOOGLE_AUTH_CALLBACK_URL  :Joi.string().required(), 

      }),
    }),
  ],
})
export class AppConfigModule {}
