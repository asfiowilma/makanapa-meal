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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("cache-manager");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const food_entity_1 = require("./food.entity");
const stringHash = require("string-hash");
const food_dto_1 = require("./food.dto");
const axios_1 = require("axios");
const constants_1 = require("../../shared/constants");
let FoodService = class FoodService {
    constructor(cache) {
        this.cache = cache;
    }
    async generateFood(filter) {
        const category = [food_dto_1.CATEGORY.BREAKFAST, food_dto_1.CATEGORY.LUNCH, food_dto_1.CATEGORY.DINNER];
        const res = [];
        await axios_1.default.all([this.grabRandomMeal(), this.grabRandomMeal(), this.grabRandomMeal()]).then(axios_1.default.spread((...responses) => {
            for (let i = 0; i < responses.length; i++) {
                const { data: { meals } } = responses[i];
                const { idMeal, strMealThumb: name, strMeal: thumbnail } = meals.pop();
                const meal = { idMeal, name, thumbnail, calories: this.getCalories(name) };
                this.cache.set(idMeal, meal, { ttl: 0 });
                res[i] = {
                    category: category[i],
                    food: meal
                };
            }
        }));
        if (filter) {
            return res.filter((x) => x.category === filter);
        }
        return res;
    }
    async getFoodById(id) {
        return await this.grabMealById(id);
    }
    async getFoodHistory(idUser) {
        const histories = await this.historyRepository.find({ where: { idUser } });
        return Promise.all(histories.map(async (history) => {
            const meal = await this.grabMealById(history.idMeal);
            return Object.assign(Object.assign({}, history), { food: meal });
        }));
    }
    async createFoodHistory(history, idUser) {
        const meal = await this.grabMealById(history.idMeal);
        const history_ = new food_entity_1.FoodHistory();
        history_.idMeal = history.idMeal;
        history_.serving = history.serving;
        history_.idUser = idUser;
        this.historyRepository.save(history_);
        return Object.assign(Object.assign({}, history_), { food: meal });
    }
    async removeFoodHistory(id, idUser) {
        const history = await this.historyRepository.findOne({ where: { id } });
        if (!history)
            throw new common_1.HttpException("Record doesn't exist", common_1.HttpStatus.NOT_FOUND);
        else if (history.idUser === idUser)
            return this.historyRepository.delete(id);
        throw new common_1.HttpException('Record belogs to someone else', common_1.HttpStatus.FORBIDDEN);
    }
    grabRandomMeal() {
        return axios_1.default.get('https://www.themealdb.com/api/json/v1/1/random.php');
    }
    async grabMealById(id) {
        const cachedMeal = await this.cache.get(id);
        if (!cachedMeal) {
            const mealResponse = await axios_1.default.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const { meals } = mealResponse.data;
            const { idMeal, strMealThumb: thumbnail, strMeal: name } = meals.pop();
            const meal = { idMeal, thumbnail, name, calories: this.getCalories(name) };
            await this.cache.set(id, meal, { ttl: 0 });
            return meal;
        }
        return cachedMeal;
    }
    async verifyUser(token) {
        const { data: user } = await axios_1.default.get(`${constants_1.AUTH_SERVICE_URL}/pengguna/detail`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return user.id;
    }
    getCalories(name) {
        const hash = stringHash(name);
        const mod = (a, b) => ((a % b) + b) % b;
        return mod(hash, 300);
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(food_entity_1.FoodHistory),
    __metadata("design:type", typeorm_2.Repository)
], FoodService.prototype, "historyRepository", void 0);
FoodService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeof (_a = typeof cache_manager_1.Cache !== "undefined" && cache_manager_1.Cache) === "function" ? _a : Object])
], FoodService);
exports.FoodService = FoodService;
//# sourceMappingURL=food.service.js.map