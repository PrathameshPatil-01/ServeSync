import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function useSearchFilter(navigate) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Get providers from Redux
  const providers = useSelector((state) => state.products?.list || state.products?.products || []);

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const lowerSearch = searchTerm.toLowerCase();

      const results = providers.filter((provider) => {
        // Search by name and label
        const matchName = provider.name?.toLowerCase().includes(lowerSearch);
        const matchLabel = provider.label?.toLowerCase().includes(lowerSearch);

        // Search inside services array (if exists)
        const matchServices =
          provider.services?.some((service) =>
            service.toLowerCase().includes(lowerSearch)
          ) ?? false;

        // Search inside subServices array (if exists)
        const matchSubServices =
          provider.subServices?.some((subService) =>
            subService.toLowerCase().includes(lowerSearch)
          ) ?? false;

        return matchName || matchLabel || matchServices || matchSubServices;
      });

      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [searchTerm, providers]);

  const handleSearch = () => {
    if (searchTerm.trim().length > 0) {
      setShowSearchModal(true);
    }
  };

  const handleResultClick = (id) => {
    navigate(`/provider/${id}`);
    setSearchTerm('');
    setFilteredResults([]);
    setShowSearchModal(false);
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredResults,
    showSearchModal,
    setShowSearchModal,
    handleSearch,
    handleResultClick,
  };
}
