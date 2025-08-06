import { Tabs, Tab } from '@mui/material';

export default function OrdersFilterTabs({ statuses, counts, selectedStatus, onChange }) {
    return (
        <Tabs
            value={selectedStatus}
            onChange={(_, newValue) => onChange(newValue)}
            sx={{ mb: 4 }}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
        >
            {statuses.map((status) => (
                <Tab
                    key={status}
                    label={`${status.charAt(0).toUpperCase() + status.slice(1)} ${counts[status] || 0}`}
                    value={status}
                />
            ))}
        </Tabs>
    );
}
