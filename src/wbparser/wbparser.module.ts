import { Module } from '@nestjs/common';
import { WBparserController } from './wbparser.controller';
import { HttpModule } from '@nestjs/axios';
import { PageParserService } from './services/parse.service';

@Module({
  imports: [HttpModule],
  controllers: [WBparserController],
  providers: [PageParserService],
})
export class WBparserModule {}
