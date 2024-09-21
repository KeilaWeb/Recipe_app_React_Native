import axios from "axios";

export const getCategories = async () => {
    try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
        console.log("Categories: ", response.data.categories);  
        return response.data.categories; 
    } catch (error) {
        console.error("Error fetching categories: ", error);
        return []; 
    }
};

export const getRecipes = async (category) => {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        console.log(`Recipes for ${category}: `, response.data.meals);
        return response.data.meals; 
    } catch (error) {
        console.error("Error fetching recipes: ", error);
        return []; 
    }
};
