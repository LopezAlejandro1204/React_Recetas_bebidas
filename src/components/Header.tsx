import { useEffect, useMemo, useState } from "react"
import {  NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"

export default function Header() {
    //state normales
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })

    // Esto nos permite ver INFORMACION de la ruta en la cual estamos
    const {pathname} = useLocation()
    //----Para ver si estamos en la pagina principal
    const isHome = useMemo(()=> pathname === '/' , [pathname])

    //-------------state para zustand
    const fetchCategories = useAppStore((state) => state.fetchCategories)
    //obteniendo categorias
    const categories = useAppStore((state) => state.categories)
    //Buscando categorias
    const searchRecipes = useAppStore((state)=> state.searchRecipes)
    //--Para mostrar la notificacion
    const showNotification = useAppStore((state)=> state.showNotification)
    
    useEffect(()=>{
        fetchCategories()
    }, [])

    //Registrando cada cambio en el state
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> ) =>
    {
        setSearchFilters ({
            ...searchFilters,
            [e.target.name] : e.target.value
        })  
    }

    //Registrando el envio en el state
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        if(Object.values(searchFilters).includes('')){
            showNotification({
                text: 'Todos los campos son obligatorios',
                error: true,
            })
            return
        }
        //Consultar las recetas - se le manda nuestra consulta de receta
        searchRecipes(searchFilters)

    }


    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
            <div className='mx-auto container px-5 py-16'>
                <div className='flex justify-between items-center'>
                    <div>
                        <img className="w-32" src="/logo.svg" alt="logotipo" />
                    </div>
                    <nav className="flex gap-4">
                        {/* El classname del NavLink permite ver si una pagina esta o no activa */}
                        <NavLink 
                            to="/"
                            className={({isActive}) => 
                            isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}
                        >Inicio</NavLink> 
                        <NavLink 
                            to="/favoritos"
                            className={({isActive}) => 
                            isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}
                        >Favoritos</NavLink> 
                    </nav>
                </div>
                {isHome && (
                    <form 
                        className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-4">
                            <label 
                                htmlFor="ingredients"
                                className="block text-black uppercase font-extrabold text-lg"
                            >
                                Nombre o ingredientes
                            </label>

                            <input 
                                type="text"
                                id="ingredient"
                                name="ingredient" 
                                className="p-3 w-full rounded-lg focus:outline-none"
                                placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Coffe"
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                            />
                        </div>

                        <div className="space-y-4">
                            <label 
                                htmlFor="category"
                                className="block text-black uppercase font-extrabold text-lg"
                            >
                                Categoria
                            </label>

                            <select 
                                id="category"
                                name="category" 
                                className="p-3 w-full rounded-lg focus:outline-none"
                                onChange={handleChange}
                                value={searchFilters.category}
                            >
                                <option value="">-- Seleccione --</option>
                                {categories.drinks.map(category => (
                                    <option 
                                        value={category.strCategory}
                                        key={category.strCategory}
                                    >
                                        {category.strCategory}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <input 
                            type="submit" 
                            value="Buscar Recetas"
                            className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
                         
                        />

                    </form>
                )}
            </div>
        </header>
    )
}
