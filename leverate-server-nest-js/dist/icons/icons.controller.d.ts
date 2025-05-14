import { IconsService } from './icons.service';
export declare class IconsController {
    private readonly iconsService;
    constructor(iconsService: IconsService);
    getIcons(term?: string, limit?: string, offset?: string): Promise<any>;
}
