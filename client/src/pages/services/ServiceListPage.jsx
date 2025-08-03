import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useState } from 'react';
import ProviderCard from '../../components/home/ProviderCard';
import { topProviders } from '../../mockData/homeMockData';
import { categories, subCategoriesMap } from '../../mockData/homeMockData';

const mainTabs = Object.keys(subCategoriesMap); // ['Fruits & Vegetables', 'Dairy', ...]

export default function ServiceListPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const [activeSidebar, setActiveSidebar] = useState('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [filterVerified, setFilterVerified] = useState('All');
  const [filterPrice, setFilterPrice] = useState('All');

  const handleTabChange = (e, newValue) => {
    setTabIndex(newValue);
    setActiveSidebar('All');
    setSelectedSubCategory('All');
  };

  const currentMainCategory = mainTabs[tabIndex];
  const subCategories = subCategoriesMap[currentMainCategory] || [];

  // Filter logic
  const filteredProviders = topProviders
    .filter((provider) =>
      activeSidebar === 'All' ? true : provider.category === activeSidebar
    )
    .filter((provider) =>
      selectedSubCategory === 'All' ? true : provider.subCategory === selectedSubCategory
    )
    .filter((provider) =>
      filterVerified === 'All' ? true : provider.verified === (filterVerified === 'Verified')
    )
    .filter(() => {
      if (filterPrice === 'Low to High') return true; // sort later
      if (filterPrice === 'High to Low') return true;
      return true;
    });

  if (filterPrice === 'Low to High') {
    filteredProviders.sort((a, b) => a.price - b.price);
  } else if (filterPrice === 'High to Low') {
    filteredProviders.sort((a, b) => b.price - a.price);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Top Tab Bar */}
      <Box sx={{ px: 2, py: 1, borderBottom: '1px solid #eee' }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {mainTabs.map((tab, i) => (
            <Tab key={i} label={tab} />
          ))}
        </Tabs>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: 220,
            borderRight: '1px solid #eee',
            background: '#fafafa',
            p: 2,
            overflowY: 'auto',
          }}
        >
          <Button
            fullWidth
            variant={activeSidebar === 'All' ? 'contained' : 'text'}
            onClick={() => setActiveSidebar('All')}
            startIcon={<span>🔘</span>}
          >
            All
          </Button>

          {categories.map((cat, index) => (
            <Button
              key={index}
              fullWidth
              variant={activeSidebar === cat.name ? 'contained' : 'text'}
              onClick={() => setActiveSidebar(cat.name)}
              startIcon={<span>{cat.icon}</span>}
              sx={{ justifyContent: 'flex-start', mt: 1 }}
            >
              {cat.name}
            </Button>
          ))}
        </Box>

        {/* Main Area */}
        <Box sx={{ flex: 1, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {activeSidebar === 'All' ? 'All Service Providers' : `${activeSidebar} Providers`}
          </Typography>

          {/* Filters */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <FormControl sx={{ minWidth: 160 }}>
              <InputLabel>Sub-category</InputLabel>
              <Select
                value={selectedSubCategory}
                label="Sub-category"
                onChange={(e) => setSelectedSubCategory(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                {subCategories.map((sub, idx) => (
                  <MenuItem key={idx} value={sub}>{sub}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Verified</InputLabel>
              <Select
                value={filterVerified}
                label="Verified"
                onChange={(e) => setFilterVerified(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Verified">Verified</MenuItem>
                <MenuItem value="Unverified">Unverified</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 160 }}>
              <InputLabel>Price</InputLabel>
              <Select
                value={filterPrice}
                label="Price"
                onChange={(e) => setFilterPrice(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Low to High">Low to High</MenuItem>
                <MenuItem value="High to Low">High to Low</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Provider Cards */}
          <Grid container spacing={2}>
            {filteredProviders.map((provider, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ProviderCard provider={provider} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}