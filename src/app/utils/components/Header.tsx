import React, { ReactElement, useState } from 'react';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import { AppBar as MuiAppBar, Divider, Drawer as MuiDrawer, IconButton, Toolbar, Typography } from '@mui/material';
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Menu as MenuIcon
} from '@mui/icons-material';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar/AppBar';

import { MenuList } from './MenuList';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${ theme.spacing(7) } + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${ theme.spacing(9) } + 1px)`,
    },
});

// export const DrawerHeader = styled('div')(({theme}) => ({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
// }));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${ drawerWidth }px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export function Header(): ReactElement {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    function handleDrawerOpen(): void {
        setOpen(true);
    }

    function handleDrawerClose(): void {
        setOpen(false);
    }

    return (
        <>
            <AppBar position="fixed" open={ open }>
                <Toolbar>
                    <IconButton color="inherit"
                                onClick={ handleDrawerOpen }
                                edge="start"
                                sx={ {
                                    marginRight: '36px',
                                    ...(open && { display: 'none' })
                                } }
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        My Tracking List
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={ open }>
                {/*<DrawerHeader>*/ }
                <IconButton onClick={ handleDrawerClose }>
                    { theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/> }
                </IconButton>
                {/*</DrawerHeader>*/ }
                <Divider/>
                <MenuList/>
            </Drawer>
        </>
    );
}
