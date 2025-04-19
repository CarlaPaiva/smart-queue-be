import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueItemModule } from './modules/queue-item/queue-item.module';
import { join } from 'path';
import { QueueModule } from './modules/queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as unknown as number,
      database: process.env.DB_NAME,
      password: process.env.DB_PWD,
      username: process.env.DB_USER,
      entities: [join(__dirname, 'modules/*/**', '*.entity.{ts,js}')],
      logger: 'advanced-console',
      migrations: ["./src/migrations/*.ts"],
      synchronize: false,
      autoLoadEntities: true
    }),
    QueueItemModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
