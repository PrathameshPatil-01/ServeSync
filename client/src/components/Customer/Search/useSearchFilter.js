// src/components/Customer/FirstPage/useSearchFilter.js
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function useSearchFilter(navigate) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const providers = useSelector((state) => state.products?.list || state.products?.products || []);

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const results = providers.filter((provider) =>
        provider.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.skills?.toLowerCase().includes(searchTerm.toLowerCase())
      );
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
