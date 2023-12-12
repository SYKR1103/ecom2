import {Module} from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store'
import { CacheModule} from '@nestjs/cache-manager'


@Module({

    imports : [

        CacheModule.registerAsync({
            imports : [ConfigModule],
            inject : [ConfigService],
            useFactory : async (cfg:ConfigService) => ({

                store : redisStore,
                host : cfg.get('REDIS_HOST'),
                user : cfg.get('REDIS_USER'),
                password : cfg.get('REDIS_PASSWORD'),
                port : cfg.get('REDIS_PORT'),
                ttl : cfg.get('REDIS_TTL'),
            }), 
            
            
            isGlobal : true,


           
        })

    ]






})
export class RedisModule {}
