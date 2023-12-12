import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from "@nestjs/config"

@Module({


    imports : [
        TypeOrmModule.forRootAsync({
            imports : [ConfigModule], 
            inject: [ConfigService],
            useFactory : (configService: ConfigService) => ({
                type: 'postgres',
                host : configService.get('POSTGRES_HOST'),
                port : configService.get('POSTGRES_PORT'),
                username :configService.get("POSTGRES_USER"),
                password :configService.get("POSTGRES_PASSWORD"),
                database : configService.get("POSTGRES_DB"),
                entities: [

                    __dirname + "/../**/*.entity{.ts,.js}"


                ], // database의 스키마를 설정해주는 부분

                autoLoadEntities : true,
                synchronize :true


            })
        })
    ]





})
export class DatabaseModule {}
