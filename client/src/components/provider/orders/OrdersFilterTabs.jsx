import { Tab, Tabs } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme

export default function OrdersFilterTabs({ statuses, counts, selectedStatus, onChange }) {
    const theme = useTheme(); // Use theme hook

    return (
        <Tabs
            value={selectedStatus}
            onChange={(_, newValue) => onChange(newValue)}
            sx={{
                mb: 4,
                borderBottom: `1px solid ${theme.palette.divider}`, // Subtle border bottom
                '& .MuiTabs-indicator': {
                    backgroundColor: theme.palette.primary.main, // Primary color indicator
                },
            }}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile // Allow scroll buttons on mobile
        >
            {statuses.map((status) => (
                <Tab
                    key={status}
                    label={`${status.charAt(0).toUpperCase() + status.slice(1)} ${counts[status] !== undefined ? `(${counts[status]})` : ''}`}
                    value={status}
                    sx={{
                        textTransform: 'none', // Keep text as is
                        fontWeight: 600, // Slightly bolder font
                        minWidth: 120, // Minimum width for tabs
                        '&.Mui-selected': {
                            color: theme.palette.primary.main, // Selected tab color
                        },
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover, // Subtle hover effect
                        },
                    }}
                />
            ))}
        </Tabs>
    );
}

