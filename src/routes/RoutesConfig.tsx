import {RouteObject} from "react-router-dom";
import RoutesList from "./RoutesList.tsx";
import RouteIDs from "./RouteIDs.tsx";
import Home from "../pages/Home/Home.tsx";
import UserProfile from "../pages/UserProfile/UserProfile.tsx";
import ScanQR from "../pages/ScanQR/ScanQR.tsx";

const routesList = RoutesList

const RoutesConfig: RouteObject[] = routesList.map((route): RouteObject => {
    console.log(route.id)
    let component: any = null

    switch (route.id) {
        case RouteIDs.HOME:
            component = <Home />
            break
        case RouteIDs.USER_PROFILE:
            component = <UserProfile />
            break
        case RouteIDs.SCAN_QR:
            component = <ScanQR />
            break
        default:
            // Handle any other routes if needed
            break
    }
    return {
        ...route,
        element: component,
    }
})

export default RoutesConfig