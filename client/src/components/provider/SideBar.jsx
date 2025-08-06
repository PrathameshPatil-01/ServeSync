import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Typography,
} from '@mui/material';
import { useState } from 'react';

import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import MessageIcon from '@mui/icons-material/Message';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

import { Link, useLocation, useNavigate } from 'react-router-dom';

// Navigation items
const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, to: '/provider/dashboard' },
    { label: 'Orders', icon: <ListAltIcon />, to: '/provider/orders' },
    { label: 'Schedule', icon: <EventIcon />, to: '/provider/schedule' },
    { label: 'Earnings', icon: <MonetizationOnIcon />, to: '/provider/earnings' },
];

// Account menu items except Logout
const accountItems = [
    { label: 'Profile', icon: <PersonIcon />, to: '/profile' },
    { label: 'Messages', icon: <MessageIcon />, to: '/messages' },
    { label: 'Settings', icon: <SettingsIcon />, to: '/settings' },
];

// Logout item separated
const logoutItem = { label: 'Logout', icon: <LogoutIcon />, to: '/logout' };

// Reusable MenuItem component with active highlighting
function MenuItemLink({ to, icon, label, selected, onClick, sx, dense = false }) {
    return (
        <ListItem
            button
            component={Link}
            to={to}
            selected={selected}
            aria-current={selected ? 'page' : undefined}
            onClick={onClick}
            dense={dense}
            sx={sx}
        >
            <ListItemIcon sx={{ color: selected ? 'primary.main' : 'inherit' }}>{icon}</ListItemIcon>
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
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

    // Open logout confirmation dialog
    const handleLogoutClick = () => {
        setLogoutDialogOpen(true);
    };

    // Close logout dialog
    const handleLogoutCancel = () => {
        setLogoutDialogOpen(false);
    };

    // Perform logout action (example: clear auth, redirect)
    const handleLogoutConfirm = () => {
        setLogoutDialogOpen(false);
        // TODO: Add your logout logic here, e.g. clear tokens, call API, etc.

        // Redirect to login page after logout
        navigate('/login', { replace: true });
    };

    return (
        <>
            <Box
                sx={{
                    width: 240,
                    bgcolor: 'background.paper',
                    height: '100vh',
                    p: 2,
                    borderRight: '1px solid',
                    borderColor: 'divider',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    userSelect: 'none',
                }}
            >
                <Typography variant="h6" gutterBottom sx={{ mb: 4, userSelect: 'text' }}>
                    ServicePro
                </Typography>

                {/* Main Navigation */}
                <List>
                    {navItems.map(({ label, icon, to }) => (
                        <MenuItemLink
                            key={label}
                            to={to}
                            icon={icon}
                            label={label}
                            selected={location.pathname === to}
                            dense
                        />
                    ))}
                </List>

                {/* Account Section */}
                <Box sx={{ mt: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <List
                        subheader={
                            <ListSubheader
                                component="div"
                                sx={{ bgcolor: 'background.paper', px: 0, pb: 1, fontWeight: 'bold' }}
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
                            />
                        ))}
                    </List>

                    {/* Logout Button fixed at bottom */}
                    <Box sx={{ mt: 'auto' }}>
                        <MenuItemLink
                            to={logoutItem.to}
                            icon={logoutItem.icon}
                            label={logoutItem.label}
                            selected={location.pathname === logoutItem.to}
                            onClick={(e) => {
                                e.preventDefault(); // prevent navigation
                                handleLogoutClick();
                            }}
                            dense
                            sx={{
                                color: 'error.main',
                                '&.Mui-selected': {
                                    bgcolor: 'error.light',
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

            {/* Logout Confirmation Dialog */}
            <Dialog open={logoutDialogOpen} onClose={handleLogoutCancel} aria-labelledby="logout-dialog-title">
                <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to logout?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLogoutCancel} color="primary">
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
