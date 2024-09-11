import axios from "axios"
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../utils/recipes-schema"
import { Drink, SearchFilter } from "../types"

export async function getCategories() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const { data } = await axios(url)
    const result = CategoriesAPIResponseSchema.safeParse(data)
    
    //Para mandarlo al state
    if(result.success){
        return result.data
    }
}

//------Para escoger opciones segun el form
export async function getRecipes(filters: SearchFilter) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`
    const {data} = await axios(url)
    const result = DrinksAPIResponse.safeParse(data) //Lo validamos

    if(result.success){
        return result.data
    }
}

//----Para buscar uno por su ID
export async function getRecipeById(id: Drink['idDrink']) 
{
    const url= `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const {data} = await axios(url)
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0]) //lo validamos
    
    if(result.success){
        return result.data
    }
}
