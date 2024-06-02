import RouteIDs from './RouteIDs.tsx'

const RoutesList = [
    {
        id: RouteIDs.HOME,
        isMainNavigation: true,
        path: '/',
        translation: 'app.nav.home',
    },
    {
        id: RouteIDs.USER_PROFILE,
        isMainNavigation: true,
        path: '/profile',
        translation: 'app.nav.user-profile',
    },
    {
        id: RouteIDs.SCAN_QR,
        isMainNavigation: true,
        path: '/scan-qr',
        translation: 'app.nav.scan-qr',
    },
    {
        id: RouteIDs.CREATE_NEW_INVOICE_MANUAL,
        isMainNavigation: true,
        path: '/new-invoice',
        translation: 'app.nav.create-new-invoice-manual',
    },
    {
        id: RouteIDs.INVOICE_DETAILS,
        isMainNavigation: false,
        path: '/invoices/:invoiceId',
        translation: 'app.nav.create-new-invoice-manual',
    }
]

export default RoutesList