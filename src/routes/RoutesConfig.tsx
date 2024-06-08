import {RouteObject} from "react-router-dom";
import RoutesList from "./RoutesList.tsx";
import RouteIDs from "./RouteIDs.tsx";
import Home from "../pages/Home/Home.tsx";
import UserProfile from "../pages/UserProfile/UserProfile.tsx";
import ScanQR from "../pages/ScanQR/ScanQR.tsx";
import CreateInvoice from "../pages/SetInvoice/SetInvoice.tsx";
import InvoiceOverview from "../pages/InvoiceOverview/InvoiceOverview.tsx";

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
        case RouteIDs.CREATE_NEW_INVOICE_MANUAL:
            component = <CreateInvoice/>
            break
        case RouteIDs.INVOICE_DETAILS:
            component = <InvoiceOverview/>
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