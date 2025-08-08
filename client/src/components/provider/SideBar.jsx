// src/components/provider/layout/Sidebar.jsx
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useState } from 'react';

import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import WorkIcon from '@mui/icons-material/Work';

import { logout as logoutProviderAuth } from '@/redux/provider/auth/providerAuthSlice';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars

// Navigation items
const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, to: '/provider/dashboard' },
    { label: 'Orders', icon: <ListAltIcon />, to: '/provider/orders' },
    { label: 'Schedule', icon: <EventIcon />, to: '/provider/schedule' },
    { label: 'Earnings', icon: <MonetizationOnIcon />, to: '/provider/earnings' },
    { label: 'Services', icon: <WorkIcon />, to: '/provider/services' },
    { label: 'Reviews', icon: <StarIcon />, to: '/provider/reviews' },
];

// Account menu items except Logout
const accountItems = [
    { label: 'Profile', icon: <PersonIcon />, to: '/provider/profile' },
];

// Logout item separated
const logoutItem = { label: 'Logout', icon: <LogoutIcon />, to: '/logout' };

// Reusable MenuItem component with active highlighting
function MenuItemLink({ to, icon, label, selected, onClick, sx, dense = false }) {
    const theme = useTheme();
    return (
        <ListItem
            button
            component={Link}
            to={to}
            selected={selected}
            aria-current={selected ? 'page' : undefined}
            onClick={onClick}
            dense={dense}
            sx={{
                borderRadius: theme.spacing(1),
                mb: theme.spacing(0.5),
                '&.Mui-selected': {
                    bgcolor: theme.palette.primary.light,
                    color: theme.palette.primary.dark,
                    '& .MuiListItemIcon-root': {
                        color: theme.palette.primary.dark,
                    },
                    '&:hover': {
                        bgcolor: theme.palette.primary.light,
                    },
                },
                '&:hover': {
                    bgcolor: theme.palette.action.hover,
                },
                ...sx,
            }}
        >
            <ListItemIcon sx={{ color: selected ? 'primary.main' : 'text.secondary' }}>{icon}</ListItemIcon>
            <ListItemText
                primary={label}
                primaryTypographyProps={{
                    fontWeight: selected ? 'medium' : 'regular',
                    color: selected ? 'primary.main' : 'text.primary',
                }}
            />
        </ListItem>
    );
}

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleLogoutClick = () => {
        setLogoutDialogOpen(true);
    };

    const handleLogoutCancel = () => {
        setLogoutDialogOpen(false);
    };

    const handleLogoutConfirm = () => {
        setLogoutDialogOpen(false);
        dispatch(logoutProviderAuth());
        navigate('/provider/login', { replace: true });
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerContent = (
        <Box
            sx={{
                width: 240,
                bgcolor: 'background.paper',
                height: '100%',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                userSelect: 'none',
            }}
        >
            <Typography variant="h5" fontWeight="bold" color="primary.main" sx={{ mb: 4, userSelect: 'text' }}>
                ServeSync
            </Typography>

            <List>
                {navItems.map(({ label, icon, to }) => (
                    <MenuItemLink
                        key={label}
                        to={to}
                        icon={icon}
                        label={label}
                        selected={location.pathname === to}
                        dense
                        onClick={isMobile ? handleDrawerToggle : undefined}
                    />
                ))}
            </List>

            <Box sx={{ mt: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <List
                    subheader={
                        <ListSubheader
                            component="div"
                            sx={{ bgcolor: 'background.paper', px: 0, pb: 1, fontWeight: 'bold', color: 'text.secondary' }}
                        >
                            Account
                        </ListSubheader>
                    }
                    sx={{ flexGrow: 1 }}
                >
                    {accountItems.map(({ label, icon, to }) => (
                        <MenuItemLink
                            key={label}
                            to={to}
                            icon={icon}
                            label={label}
                            selected={location.pathname === to}
                            dense
                            onClick={isMobile ? handleDrawerToggle : undefined}
                        />
                    ))}
                </List>

                <Box sx={{ mt: 'auto' }}>
                    <MenuItemLink
                        to={logoutItem.to}
                        icon={logoutItem.icon}
                        label={logoutItem.label}
                        selected={location.pathname === logoutItem.to}
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogoutClick();
                        }}
                        dense
                        sx={{
                            color: 'error.main',
                            '&.Mui-selected': {
                                bgcolor: 'error.light, 0.2)',
                                color: 'error.dark',
                            },
                            '&:hover': {
                                bgcolor: 'error.light',
                            },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );

    return (
        <>
            {isMobile && (
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' }, position: 'fixed', top: 16, left: 16, zIndex: theme.zIndex.drawer + 1 }}
                >
                    <MenuIcon />
                </IconButton>
            )}

            <Box
                component="nav"
                sx={{ width: { md: 240 }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                {isMobile ? (
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, borderRight: 'none' },
                        }}
                    >
                        {drawerContent}
                    </Drawer>
                ) : (
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, borderRight: '1px solid', borderColor: 'divider' },
                        }}
                        open
                    >
                        {drawerContent}
                    </Drawer>
                )}
            </Box>

            <Dialog open={logoutDialogOpen} onClose={handleLogoutCancel} aria-labelledby="logout-dialog-title" PaperProps={{ sx: { borderRadius: 3 } }}>
                <DialogTitle id="logout-dialog-title" sx={{ bgcolor: 'primary.main', color: 'white', pb: 2 }}>Confirm Logout</DialogTitle>
                <DialogContent sx={{ pt: 2 }}>
                    <DialogContentText>Are you sure you want to logout?</DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleLogoutCancel} color="secondary" variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleLogoutConfirm} color="error" variant="contained" autoFocus>
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
