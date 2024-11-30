import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WBparserModule } from './wbparser/wbparser.module';

@Module({
  imports: [WBparserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
