import { CATEGORY, Food, FoodByCategory, FoodHistoryRequest, FoodHistoryResponse, FoodResponse } from './food.dto';
export declare class FoodService {
    private historyRepository;
    generateFood(filter?: CATEGORY): Promise<FoodByCategory[]>;
    getFoodById(id: number): Promise<Food>;
    getFoodHistory(idUser: number): Promise<FoodHistoryResponse[]>;
    createFoodHistory(history: FoodHistoryRequest, idUser: number): Promise<FoodHistoryResponse>;
    removeFoodHistory(id: number, idUser: number): Promise<import("typeorm").DeleteResult>;
    grabRandomMeal(): Promise<import("axios").AxiosResponse<{
        meals: FoodResponse[];
    }, any>>;
    grabMealById(id: number): Promise<FoodResponse>;
    verifyUser(token: string): Promise<number>;
}
