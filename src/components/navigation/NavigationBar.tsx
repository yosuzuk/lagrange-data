import { useState } from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '../container/Container';

const menuItems: Record<string, string> = {
    '/techFiles': '技術ファイル',
    '/shipData': '艦船一覧',
    '/myList': 'マイリスト',
    '/fleetSetup': '艦隊編成',
};

interface IProps {
    currentRoute: string;
}

export const NavigationBar = (props: IProps) => {
    const { currentRoute } = props;

    const theme = useTheme();
    const burgerMenu = useMediaQuery(theme.breakpoints.down('sm'));

    const [drawerOpened, setDrawerOpened] = useState<boolean>(false);

    const handleOpenDrawer = () => {
        setDrawerOpened(true);
    };

    const handleCloseDrawer = () => {
        setDrawerOpened(false);
    };

    return (
        <>
            <AppBar position="sticky">
                {burgerMenu ? (
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={handleOpenDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {menuItems[currentRoute] ?? ''}
                        </Typography>
                    </Toolbar>
                ) : (
                    <Container>
                        <Tabs
                            value={currentRoute}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="scrollable"
                            scrollButtons="auto"
                        >
                            {Object.keys(menuItems).map(route => (
                                <Tab label={menuItems[route]} value={route} to={route} component={Link} />
                            ))}
                        </Tabs>
                    </Container>
                )}
                {burgerMenu && (
                    <Drawer
                        anchor="top"
                        open={drawerOpened}
                        onClose={handleCloseDrawer}
                    >
                        <Box
                            sx={{ width: 'auto' }}
                            role="presentation"
                            onClick={handleCloseDrawer}
                            onKeyDown={handleCloseDrawer}
                        >
                            <List>
                                {Object.keys(menuItems).map(route => (
                                    <ListItem button key={route}>
                                        <ListItemText
                                            primary={menuItems[route]}
                                            primaryTypographyProps={{
                                                to: route,
                                                component: Link,
                                                color: 'text.primary',
                                                sx: { textDecoration: 'none' }
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Drawer>
                )}
            </AppBar>
        </>
    );
};
