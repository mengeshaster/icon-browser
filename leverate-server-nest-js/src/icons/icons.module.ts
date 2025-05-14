import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IconsService } from './icons.service';
import { IconsController } from './icons.controller';

@Module({
    imports: [
        HttpModule,
    ],
    controllers: [IconsController],
    providers: [IconsService],
})
export class IconsModule { }
