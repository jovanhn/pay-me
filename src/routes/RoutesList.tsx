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
    }
]

export default RoutesList