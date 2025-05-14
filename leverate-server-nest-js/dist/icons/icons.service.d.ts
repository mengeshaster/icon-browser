import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class IconsService {
    private readonly httpService;
    private readonly config;
    private oauth;
    private readonly baseUrl;
    constructor(httpService: HttpService, config: ConfigService);
    fetchIcons(term?: string, limit?: string, offset?: string): Promise<any>;
}
