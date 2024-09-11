import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import type { Categories, Drinks, Drink ,SearchFilter, Recipe } from "../types"

//Recibimos los types desde el index.ts de la carpeta Types
export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks
    selectedRecipe: Recipe
    modal: boolean

    fetchCategories: () => Promise<void> //--para la prmera accion - obtener
    searchRecipes: (searchFilter: SearchFilter) => Promise<void> //--Para la segunda accion - buscar
    selectRecipe: (id: Drink['idDrink'] ) => Promise<void> //----Para selecconar una receta
    closeModal: () => void
}
//se recupera los argumentos del ...a
//-State Creator para crear el state y decirle que tipo de Type tiene
export const createRecipesSlice : StateCreator<RecipesSliceType> = (set) => ({
    //---states - agregando
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe, //Añadimos todos los atributos al State
    modal: false,

    //---Acciones
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories: categories
        })
    },
    //buscar las recetas
    searchRecipes: async (filters) => { //Lo que le pasamos desde el Header
        const drinks = await getRecipes(filters) //Se va a nuestro servicio - donde interactuamos con la API

        set({ //lo seteamos y lo vemos por Redux
            drinks 
        })
    },
    //Seleccionar una receta
    selectRecipe: async (id)=> {
        const selectedRecipe = await getRecipeById(id)
        set({
            selectedRecipe,
            modal: true
        })
    },
    //----Para cerrrar el modal
    closeModal : () => {
        set({
            modal: false,
            selectedRecipe: {} as Recipe
        })
    }
})