import { Controller, Get, Query } from '@nestjs/common';
import { IconsService } from './icons.service';

@Controller('icons')
export class IconsController {
  constructor(private readonly iconsService: IconsService) {}

  @Get('getIcons')
  async getIcons(
    @Query('term') term?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.iconsService.fetchIcons(term, limit, offset);
  }
}
