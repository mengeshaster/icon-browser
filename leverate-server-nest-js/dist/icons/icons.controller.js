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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconsController = void 0;
const common_1 = require("@nestjs/common");
const icons_service_1 = require("./icons.service");
let IconsController = class IconsController {
    iconsService;
    constructor(iconsService) {
        this.iconsService = iconsService;
    }
    async getIcons(term, limit, offset) {
        return this.iconsService.fetchIcons(term, limit, offset);
    }
};
exports.IconsController = IconsController;
__decorate([
    (0, common_1.Get)('getIcons'),
    __param(0, (0, common_1.Query)('term')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], IconsController.prototype, "getIcons", null);
exports.IconsController = IconsController = __decorate([
    (0, common_1.Controller)('icons'),
    __metadata("design:paramtypes", [icons_service_1.IconsService])
], IconsController);
//# sourceMappingURL=icons.controller.js.map