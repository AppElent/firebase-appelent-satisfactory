import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const useTabs = (initialTab = '', tabname = 'tab') => {
  const [tab, setTab] = useState(initialTab);
  const location = useLocation();

  useEffect(() => {
    // If there is a query param named tab then set that tab
    const params = new URLSearchParams(location.search);
    const tabQuery = params.get(tabname);
    if (tabQuery) {
      setTab(tabQuery);
    }
  }, [location.search]);

  const handleTabChange = useCallback((_e, newValue) => {
    setTab(newValue);
  }, []);

  return { tab, handleTabChange, setTab };
};

export default useTabs;
