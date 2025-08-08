// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#EB3C25', // A vibrant red for primary actions and branding
            light: '#FF6B5B', // Lighter shade for hover/active states
            dark: '#C02F1F',  // Darker shade for text/icons on primary background
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#4A90E2', // A soothing blue for secondary actions/elements
            light: '#7BB0F0',
            dark: '#3A70B0',
            contrastText: '#ffffff',
        },
        error: {
            main: '#D32F2F', // Standard error red
            light: '#EF5350',
            dark: '#C62828',
        },
        warning: {
            main: '#FFC107', // Standard warning yellow
            light: '#FFD54F',
            dark: '#FFA000',
        },
        info: {
            main: '#2196F3', // Standard info blue
            light: '#64B5F6',
            dark: '#1976D2',
        },
        success: {
            main: '#4CAF50', // Standard success green
            light: '#81C784',
            dark: '#388E3C',
        },
        text: {
            primary: '#333333', // Dark gray for main text
            secondary: '#666666', // Lighter gray for secondary text
            disabled: '#999999', // Even lighter for disabled text
        },
        background: {
            default: '#F8F9FA', // Light gray for overall page background
            paper: '#FFFFFF',   // White for cards and elevated surfaces
        },
        divider: '#E0E0E0', // Light gray for dividers
    },
    typography: {
        fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
        h1: { fontSize: '3rem', fontWeight: 700 },
        h2: { fontSize: '2.5rem', fontWeight: 700 },
        h3: { fontSize: '2rem', fontWeight: 600 },
        h4: { fontSize: '1.75rem', fontWeight: 600 },
        h5: { fontSize: '1.5rem', fontWeight: 600 },
        h6: { fontSize: '1.25rem', fontWeight: 600 },
        subtitle1: { fontSize: '1rem', fontWeight: 500 },
        subtitle2: { fontSize: '0.875rem', fontWeight: 500 },
        body1: { fontSize: '1rem', lineHeight: 1.6 },
        body2: { fontSize: '0.875rem', lineHeight: 1.5 },
        button: { textTransform: 'none', fontWeight: 600 },
        caption: { fontSize: '0.75rem' },
        overline: { fontSize: '0.75rem', textTransform: 'uppercase' },
    },
    shape: {
        borderRadius: 8, // Global border radius for components
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true, // Disable default shadow for a flatter look
            },
            styleOverrides: {
                root: {
                    borderRadius: 8, // Apply global border radius
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-2px)', // Subtle lift on hover
                    },
                },
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: '#C02F1F', // Darker primary on hover
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
                    },
                },
                outlinedPrimary: {
                    '&:hover': {
                        backgroundColor: 'rgba(235, 60, 37, 0.08)', // Light primary tint on hover
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12, // More rounded cards
                    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.05)', // Subtle shadow
                    transition: 'box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.1)', // Enhanced shadow on hover
                    },
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                size: 'medium',
            },
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8, // Rounded text fields
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12, // Consistent with cards
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 12, // Rounded dialogs
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // Prevent uppercase tabs
                    fontWeight: 600,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                },
            },
        },
    },
});

export default theme;
