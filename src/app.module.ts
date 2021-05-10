import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';
import { CatsService } from './cats/cats.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [UsersModule, CatsModule, ConfigModule.forRoot()], // 이 모듈에 필요한 공급자를 내보내는 가져온 모듈 목록
  controllers: [AppController, CatsController], // 인스턴스화 되어야 하는 모듈에 정의된 컨트롤러 세트
  providers: [AppService, CatsService], // Nest 인젝터에 의해 인스턴스화되고 적어도 이 모듈에서 공유될 수 있는 공급자.
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
