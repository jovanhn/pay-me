import {Route, RouteObject, Routes} from 'react-router-dom'
import RoutesConfig from './RoutesConfig.tsx'

const RoutesSQ = () => {
    const renderRoutes = () => (
        <Routes>
            {RoutesConfig.map((route: RouteObject) => (
                <Route
                    key={route.id}
                    path={route.path}
                    element={route.element}
                    errorElement={route.errorElement}
                />
            ))}
        </Routes>
    )

    return renderRoutes()
}

export default RoutesSQ