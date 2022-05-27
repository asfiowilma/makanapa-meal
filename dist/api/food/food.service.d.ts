import { Cache } from 'cache-manager';
import { CATEGORY, Food, FoodByCategory, FoodHistoryRequest, FoodHistoryResponse, FoodResponse } from './food.dto';
export declare class FoodService {
    private readonly cache;
    constructor(cache: Cache);
    private historyRepository;
    generateFood(filter?: CATEGORY): Promise<FoodByCategory[]>;
    getFoodById(id: number): Promise<Food>;
    getFoodHistory(idUser: number): Promise<FoodHistoryResponse[]>;
    createFoodHistory(history: FoodHistoryRequest, idUser: number): Promise<FoodHistoryResponse>;
    removeFoodHistory(id: number, idUser: number): Promise<import("typeorm").DeleteResult>;
    grabRandomMeal(): Promise<import("axios").AxiosResponse<{
        meals: FoodResponse[];
    }, any>>;
    grabMealById(id: number): Promise<Food>;
    verifyUser(token: string): Promise<number>;
    getCalories(name: string): number;
}
