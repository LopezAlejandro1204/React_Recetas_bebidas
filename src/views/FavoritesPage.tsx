import DrinkCard from "../components/DrinkCard"
import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"

export default function FavoritesPage() {
    //importamos el store - Para mandar los favoritos a esta vista
    const favorites = useAppStore((state) => state.favorites)
    //----Para ver si existe o no favoritos
    const hasFavorites = useMemo(() => favorites.length , [favorites])

    return (
        <>
            <h1 className="text-6xl font-extrabold">Favoritos</h1>

            {hasFavorites ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 my-10 gap-10">
                    {favorites.map(drink => (
                        <DrinkCard
                            key={drink.idDrink}
                            drink={drink}
                        />
                    ))}
                </div>
            ): (
                <p className="my-10 text-center text-2xl">
                    Los favoritos se mostraran aqui
                </p>
            )}
        </>
    )
}
