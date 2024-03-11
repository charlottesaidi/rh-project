

import { AppBar, Toolbar, Button, styled } from '@mui/material';
import { companyLogo } from '../../constants/constant';
import Search from './Search';
import {logoutUser} from "../../service/auth";

const StyledToolBar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between'
})

const Header = () => {
    const logOut = () => {
      logoutUser();
    }

    return (
        <AppBar color="action">
            <StyledToolBar>
                <img src={companyLogo} alt="logo" style={{ width: 110 }} />
                <Search />
                <Button onClick={logOut}>Déconnexion</Button>
            </StyledToolBar>
        </AppBar>
    )
}

export default Header;