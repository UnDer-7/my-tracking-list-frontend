import React, {ReactElement, useState} from "react";
import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {
    ViewList as ViewListIcon,
    AccountCircle as AccountCircleIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    Add as AddIcon,
} from "@mui/icons-material";

import {useRoutes} from "../hooks/useRoutes";

type MenuButtonProp = {
    name: string;
    onClick: () => void;
    icon: React.ReactNode;
    isOpen?: boolean,
    subMenu?: boolean,
};

function Expand({ isOpen }: { isOpen?: boolean }): ReactElement | null {
    if (isOpen === undefined) return null;

    return isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />;
}

function MenuButton(props: MenuButtonProp): ReactElement {
    const { name, onClick, icon, isOpen, subMenu } = props;

    return (
        <ListItem key={name} onClick={onClick} disablePadding>
            <ListItemButton sx={{ pl: subMenu ? 4 : null }}>
                <ListItemIcon>
                    { icon }
                </ListItemIcon>
                <ListItemText primary={name} />
                <Expand isOpen={isOpen} />
            </ListItemButton>
        </ListItem>
    );
}

export function MenuList(): ReactElement {
    const { goToAccountDetail, lists: { goToDefaultListPage, goToNewListPage } } = useRoutes();
    const [ isMyListOpen, setIsMyListOpen ] = useState(false);

    function toggleMyList(): void {
        setIsMyListOpen(!isMyListOpen);
    }

    function onMyListClick(): void {
        if (!isMyListOpen) goToDefaultListPage();
        toggleMyList();
    }

    return (
        <List>
            <MenuButton name="My Lists" onClick={onMyListClick} icon={ <ViewListIcon /> } isOpen={isMyListOpen}/>
            <Collapse in={isMyListOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <MenuButton name="New List"
                                onClick={goToNewListPage}
                                icon={ <AddIcon /> }
                                subMenu
                    />
                </List>
            </Collapse>
            <MenuButton name="Account Detail" onClick={goToAccountDetail} icon={ <AccountCircleIcon />} />
        </List>
    )
}