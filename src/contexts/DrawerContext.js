import { createContext, useState, useCallback, useRef } from 'react'
import Drawer from '@mui/material/Drawer';

export const DrawerContext = createContext();

let drawerContent;

function DrawerProvider(props) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openDrawer = useCallback((elements) => {
        if (isDrawerOpen) {
            return;
        }

        drawerContent = elements

        setIsDrawerOpen(true);
    }, [isDrawerOpen])

    const closeDrawer = useCallback(() => {
        if (!isDrawerOpen) {
            return;
        }

        drawerContent = null;

        setIsDrawerOpen(false);
    }, [isDrawerOpen])

    return (
        <DrawerContext.Provider value={{ openDrawer, closeDrawer }}>
            <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <div style={{ width: "400px", padding: "50px" }}>
                    {drawerContent}
                </div>
            </Drawer>
            {props.children}
        </DrawerContext.Provider>
    )
}

export default DrawerProvider