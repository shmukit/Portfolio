"use client";

import { useState } from 'react';

export function usePortfolio() {
  const [showPortfolio, setShowPortfolio] = useState(false);

  const togglePortfolio = () => {
    setShowPortfolio(!showPortfolio);
  };

  return { showPortfolio, togglePortfolio };
}
