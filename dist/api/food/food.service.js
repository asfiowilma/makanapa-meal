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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const food_entity_1 = require("./food.entity");
const food_dto_1 = require("./food.dto");
const axios_1 = require("axios");
const constants_1 = require("../../shared/constants");
let FoodService = class FoodService {
    async generateFood(filter) {
        const category = [food_dto_1.CATEGORY.BREAKFAST, food_dto_1.CATEGORY.LUNCH, food_dto_1.CATEGORY.DINNER];
        const res = [];
        await axios_1.default.all([this.grabRandomMeal(), this.grabRandomMeal(), this.grabRandomMeal()]).then(axios_1.default.spread((...responses) => {
            for (let i = 0; i < responses.length; i++) {
                const { data: { meals } } = responses[i];
                const { idMeal, strMealThumb, strMeal } = meals.pop();
                res[i] = {
                    category: category[i],
                    food: {
                        idMeal: idMeal,
                        name: strMeal,
                        thumbnail: strMealThumb,
                        calories: Math.round(Math.random() * 300)
                    }
                };
            }
        }));
        if (filter) {
            return res.filter((x) => x.category === filter);
        }
        return res;
    }
    async getFoodById(id) {
        const { idMeal, strMealThumb, strMeal } = await this.grabMealById(id);
        return {
            idMeal: idMeal,
            name: strMeal,
            thumbnail: strMealThumb,
            calories: Math.round(Math.random() * 300)
        };
    }
    async getFoodHistory(idUser) {
        const histories = await this.historyRepository.find({ where: { idUser } });
        return Promise.all(histories.map(async (history) => {
            const { idMeal, strMealThumb, strMeal } = await this.grabMealById(history.idMeal);
            return Object.assign(Object.assign({}, history), { food: {
                    idMeal: idMeal,
                    name: strMeal,
                    thumbnail: strMealThumb,
                    calories: Math.round(Math.random() * 300)
                } });
        }));
    }
    async createFoodHistory(history, idUser) {
        const { idMeal, strMealThumb, strMeal } = await this.grabMealById(history.idMeal);
        const history_ = new food_entity_1.FoodHistory();
        history_.idMeal = history.idMeal;
        history_.serving = history.serving;
        history_.idUser = idUser;
        this.historyRepository.save(history_);
        return Object.assign(Object.assign({}, history_), { food: {
                idMeal,
                name: strMeal,
                thumbnail: strMealThumb,
                calories: Math.round(Math.random() * 300)
            } });
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
        const mealResponse = await axios_1.default.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const { meals } = mealResponse.data;
        return meals.pop();
    }
    async verifyUser(token) {
        const { data: user } = await axios_1.default.get(`${constants_1.AUTH_SERVICE_URL}/pengguna/detail`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return user.id;
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(food_entity_1.FoodHistory),
    __metadata("design:type", typeorm_2.Repository)
], FoodService.prototype, "historyRepository", void 0);
FoodService = __decorate([
    (0, common_1.Injectable)()
], FoodService);
exports.FoodService = FoodService;
//# sourceMappingURL=food.service.js.map