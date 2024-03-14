import React from "react";
import { Drawer } from "@mui/material";
import SideBarContent from "./SideBarContent";

const SideBar = () => {
    const [background, setBackground] = React.useState('#445A6F');

    React.useEffect(() => {
      const interval = setInterval(() => {
        blink()
      }, 10000);

      return () => clearInterval(interval);
    }, []);

    const blink = () => {
      setInterval(() => {
        setBackground(prev => (prev === '#445A6F' ? '#32CD32' : '#445A6F'));
      }, 100);
    }

    return (
        <Drawer
            anchor={'left'}
            open={true}
            hideBackdrop={true}
            ModalProps={{
                keepMounted: true,
            }}
            variant="persistent"
            sx={{
                '& .MuiDrawer-paper': { 
                    width: '250px',
                    maxWidth: '250px',
                    height: 'calc(100vh - 64px)',
                    marginTop: '64px',
                    background: background
                },
            }}
        >
            <SideBarContent />
        </Drawer>
    )
}

export default SideBar;