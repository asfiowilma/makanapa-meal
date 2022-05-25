import { CATEGORY, FoodByCategory, FoodHistoryRequest, FoodHistoryResponse, Food } from './food.dto';
import { Request } from 'express';
export declare class FoodController {
    private readonly service;
    getRecommendation(filter?: CATEGORY): Promise<FoodByCategory[]>;
    getFoodById(id: number): Promise<Food>;
    getFoodHistory(request: Request): Promise<FoodHistoryResponse[]>;
    createFoodHistory(request: Request, history: FoodHistoryRequest): Promise<FoodHistoryResponse>;
    removeFoodHistory(request: Request, id: number): Promise<import("typeorm").DeleteResult>;
}
