export declare class FoodResponse {
    idMeal: number;
    strMeal: string;
    strMealThumb: string;
}
export declare class Food {
    idMeal: number;
    name: string;
    thumbnail: string;
    calories: number;
}
export declare class FoodHistoryRequest {
    idMeal: number;
    serving: number;
}
export declare class FoodHistoryResponse {
    id: number;
    date: Date;
    serving: number;
    food: Food;
}
export declare enum CATEGORY {
    BREAKFAST = "breakfast",
    LUNCH = "lunch",
    DINNER = "dinner"
}
export declare class FoodByCategory {
    category: CATEGORY;
    food: Food;
}
export declare class User {
    id: number;
}
