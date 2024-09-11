//Este archivo englobara todos los otros stores
import { create } from "zustand"; //Esto crea el State
import { devtools } from 'zustand/middleware'
import { createRecipesSlice, RecipesSliceType } from "./recipeSlice";
import { FavoriteSliceType, crateFavoritesSlice } from "./favoriteSlice";
import { NotificationSliceType, crateNotificationSlice } from "./notificationSlice";

//----Para ir agregando al Store
export const useAppStore = create<RecipesSliceType & FavoriteSliceType & NotificationSliceType>()(devtools((...a) => ({ //...a para mandar todos los argumetos, set get...
    ...createRecipesSlice(...a), //llamando a la primera parte del store
    ...crateFavoritesSlice(...a), 
    ...crateNotificationSlice(...a), 
})))