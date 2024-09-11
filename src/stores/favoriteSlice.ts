import {StateCreator} from "zustand";
import { Recipe } from "../types";
import { crateNotificationSlice, NotificationSliceType } from "./notificationSlice";

//----Los types
export type FavoriteSliceType = {
    favorites: Recipe[]

    handleClickFavorite: (recipe: Recipe) => void
    favoriteExists: (id: Recipe['idDrink']) => boolean
    loadFromStorage: () => void
}

export const crateFavoritesSlice : StateCreator<FavoriteSliceType & NotificationSliceType, [], [], FavoriteSliceType> = (set, get, api) => ({
    //--Los estados
    favorites: [],

    //-----acciones
    handleClickFavorite: (recipe) => {

        //console.log(get().favorites) //Para obtener ya sea State o acciones que pertenecen a este mismo Slice
        if(get().favoriteExists(recipe.idDrink)){
            set((state)=> ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
            crateNotificationSlice(set,get,api).showNotification({
                text: 'Se elimino de favoritos', 
                error: false
            })
        }else{
            set((state)=>({
                favorites: [...state.favorites, recipe]
            }))
            crateNotificationSlice(set,get,api).showNotification({
                text: 'Se agrego a favoritos', 
                error: false
            })
        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites)) //Para que este en LocalStorage
        
    },
    //---Se encargara de ver si existe o no ese favorito en el State
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    ///-----Cargando en favoritos desde LocalStorage
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites) //--Lo metemos al state
            })
        }
    }

})
