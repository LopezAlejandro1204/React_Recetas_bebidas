
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Layout from './layouts/Layout'
import {lazy, Suspense} from 'react' //Para dividir la pagina y que no se sobrecargue

//----SE PUEDE HACER CON LAS PAGINAS QUE QUERAMOS
const FavoritesPage = lazy(() => import('./views/FavoritesPage')) //La ruta afectada
const IndexPage = lazy(() => import('./views/IndexPage')) //La ruta afectada

export default function Approuter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Componentes para todas las paginas */}
                <Route element={<Layout/>}> 
                    <Route path='/' element={
                        //Suspense hasta que sea utilizada la pagina
                        <Suspense fallback="Cargando">
                            <IndexPage/>
                        </Suspense>
                    } index />
                    <Route path='/favoritos' element={
                        //Suspense hasta que sea utilizada la pagina
                        <Suspense fallback="Cargando">
                            <FavoritesPage/>
                        </Suspense>
                    }/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
