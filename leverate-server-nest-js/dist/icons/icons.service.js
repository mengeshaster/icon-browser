"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const oauth_1_0a_1 = __importDefault(require("oauth-1.0a"));
const crypto_js_1 = __importDefault(require("crypto-js"));
let IconsService = class IconsService {
    httpService;
    config;
    oauth;
    baseUrl;
    constructor(httpService, config) {
        this.httpService = httpService;
        this.config = config;
        this.baseUrl = this.config.get('NOUN_PROJECT_BASE_URL');
        this.oauth = new oauth_1_0a_1.default({
            consumer: {
                key: this.config.get('API_KEY'),
                secret: this.config.get('API_SECRET'),
            },
            signature_method: 'HMAC-SHA1',
            hash_function(base_string, key) {
                return crypto_js_1.default.HmacSHA1(base_string, key).toString(crypto_js_1.default.enc.Base64);
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
        }
        catch (err) {
            console.error('NounProject API error:', err.message);
            throw new Error('Failed to fetch icons');
        }
    }
};
exports.IconsService = IconsService;
exports.IconsService = IconsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], IconsService);
//# sourceMappingURL=icons.service.js.map