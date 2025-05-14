import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto-js';

@Injectable()
export class IconsService {
  private oauth: OAuth;
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {

    this.baseUrl = this.config.get<string>('NOUN_PROJECT_BASE_URL')!;

    this.oauth = new OAuth({
      consumer: {
        key: this.config.get<string>('API_KEY')!,
        secret: this.config.get<string>('API_SECRET')!,
      },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return crypto.HmacSHA1(base_string, key).toString(crypto.enc.Base64);
      },
    });
  }

  async fetchIcons(term = '', limit = '10', offset = '0') {
    const url = `${this.baseUrl}?query=${term}&limit=${limit}&offset=${offset}`;
    const requestData = { url, method: 'GET' };

    const oauthHeader = this.oauth.toHeader(this.oauth.authorize(requestData));
    const { Authorization } = oauthHeader;

    try {
      const response = await this.httpService.axiosRef.get(url, {
        headers: { Authorization },
      });

      if (response.status >= 400 && response.status < 500) {
        throw new Error(`Error fetching icons: ${response.statusText}`);
      }

      if (!response.data) {
        throw new Error('No data received from NounProject API');
      }

      return response.data;
    } catch (err: any) {
      console.error('NounProject API error:', err.message);
      throw new Error('Failed to fetch icons');
    }
  }
}
