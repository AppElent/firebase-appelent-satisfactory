import { useState } from 'react';

const useAccordion = (initialValue) => {
  const [expanded, setExpanded] = useState(initialValue);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return { expanded, handleAccordionChange };
};

export default useAccordion;
