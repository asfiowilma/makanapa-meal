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
exports.FoodController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const food_service_1 = require("./food.service");
const food_dto_1 = require("./food.dto");
const constants_1 = require("../../shared/constants");
let FoodController = class FoodController {
    getRecommendation(filter) {
        return this.service.generateFood(filter);
    }
    getFoodById(id) {
        return this.service.getFoodById(id);
    }
    async getFoodHistory(request) {
        const idUser = await this.service.verifyUser(request.headers.authorization);
        if (idUser === constants_1.INVALID_USER)
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        return this.service.getFoodHistory(idUser);
    }
    async createFoodHistory(request, history) {
        const idUser = await this.service.verifyUser(request.headers.authorization);
        if (idUser === constants_1.INVALID_USER)
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        return this.service.createFoodHistory(history, idUser);
    }
    async removeFoodHistory(request, id) {
        const idUser = await this.service.verifyUser(request.headers.authorization);
        if (idUser === constants_1.INVALID_USER)
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        return this.service.removeFoodHistory(id, idUser);
    }
};
__decorate([
    (0, common_1.Inject)(food_service_1.FoodService),
    __metadata("design:type", food_service_1.FoodService)
], FoodController.prototype, "service", void 0);
__decorate([
    (0, common_1.Get)('generate'),
    (0, swagger_1.ApiQuery)({
        name: 'filter',
        description: "Filter parameter, to be used with 'breakfast', 'lunch', or 'dinner'.",
        required: false
    }),
    __param(0, (0, common_1.Query)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "getRecommendation", null);
__decorate([
    (0, common_1.Get)('/food/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "getFoodById", null);
__decorate([
    (0, common_1.Get)('history'),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "getFoodHistory", null);
__decorate([
    (0, swagger_1.ApiBody)({
        type: food_dto_1.FoodHistoryRequest,
        examples: {
            'Teriyaki Chicken Casserole': { value: { idMeal: 52772, serving: 1 } }
        }
    }),
    (0, common_1.Post)('history'),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, food_dto_1.FoodHistoryRequest]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "createFoodHistory", null);
__decorate([
    (0, common_1.Delete)('history/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "removeFoodHistory", null);
FoodController = __decorate([
    (0, common_1.Controller)()
], FoodController);
exports.FoodController = FoodController;
//# sourceMappingURL=food.controller.js.map