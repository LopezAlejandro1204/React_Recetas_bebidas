//-----Esquema para nuestra API
import {z} from 'zod'

//-------------------DE ACA SE PASA A NUESTROS TYPES PARA INFERIRLOS
export const CategoriesAPIResponseSchema = z.object({
    drinks: z.array(
        z.object({
            strCategory: z.string()
        })
    )
})

//----para la busqueda, recordemos que se debe tipar dos elementos
export const searchFilterSchema = z.object({
    ingredient: z.string(),
    category: z.string()
})

//---Esquema para lo obtenido en la busqueda
//
export const DrinkAPIResponse = z.object({
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string()
})
export const DrinksAPIResponse = z.object({
    drinks: z.array(DrinkAPIResponse) //Para ponerlo dentro del arreglo
})

//----Esquema para los ingredients
export const RecipeAPIResponseSchema = z.object({
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string(),
    strInstructions: z.string(),
    strIngredient1: z.string().nullable(),
    strIngredient2: z.string().nullable(),
    strIngredient3: z.string().nullable(),
    strIngredient4: z.string().nullable(),
    strIngredient5: z.string().nullable(),
    strIngredient6: z.string().nullable(),
    strMeasure1: z.string().nullable(),
    strMeasure2: z.string().nullable(),
    strMeasure3: z.string().nullable(),
    strMeasure4: z.string().nullable(),
    strMeasure5: z.string().nullable(),
    strMeasure6: z.string().nullable(),
});