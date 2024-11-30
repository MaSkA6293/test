import { Body, Controller, Post } from '@nestjs/common';
import { ParseDto } from './dto/parse.dto';
import { PageParserService } from './services/parse.service';

@Controller('wbparser')
export class WBparserController {
  constructor(private pageParserService: PageParserService) {}
  @Post()
  async parse(@Body() data: ParseDto) {
    const result = await this.pageParserService.getData1(data);
    return result;
  }
}
