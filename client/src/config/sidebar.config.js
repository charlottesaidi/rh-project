
import { routes } from "../routes/routes"
import { AddCircleOutline, ViewStream, HomeOutlined } from '@mui/icons-material';

export const SIDEBAR_DATA = [
    {
        name: 'home',
        title: 'Candidatures',
        icon: HomeOutlined,
        activeIcon: '',
        path: routes.main.path,
        headerRow: true,
    },
    {
        name: 'addoffer',
        title: 'Publier une offre',
        icon: AddCircleOutline,
        activeIcon: '',
        path: routes.main.path,
        headerRow: false,
    },
    {
        name: 'posts',
        title: 'Offres',
        icon: ViewStream,
        activeIcon: '',
        path: routes.main.path,
        headerRow: false,
    },
];