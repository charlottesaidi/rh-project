
import { routes } from "../routes/routes"
import { PersonAdd, ViewStream, HomeOutlined } from '@mui/icons-material';

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
        name: 'addemployee',
        title: 'Publier une offre',
        icon: PersonAdd,
        activeIcon: '',
        path: routes.main.path,
        headerRow: false,
    },
    {
        name: 'employees',
        title: 'Offres',
        icon: ViewStream,
        activeIcon: '',
        path: routes.main.path,
        headerRow: false,
    },
];