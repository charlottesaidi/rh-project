import Header from "../components/header/Header";
import SideBar from "../components/sidebar/SideBar";
import {Suspense} from "react";
import SuspenseLoader from "../components/common/SuspenseLoader";
import {Box, styled} from "@mui/material";
import {Outlet} from "react-router-dom";

const Wrapper = styled(Box)({
    display: 'flex',
    margin: '64px 0 0 250px',
});

const AppLayout = () => {
    return (
        <>
            <Header />
            <Wrapper>
                <SideBar />
                <Suspense fallback={<SuspenseLoader />} >
                    <Box>
                        <Outlet />
                    </Box>
                </Suspense>
            </Wrapper>
        </>
    );
}

export default AppLayout;