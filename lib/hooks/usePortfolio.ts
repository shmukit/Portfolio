"use client";

import { useState } from 'react';

export function usePortfolio() {
  const [showPortfolio, setShowPortfolio] = useState(false);

  const openPortfolio = () => {
    setShowPortfolio(true);
  };

  const closePortfolio = () => {
    setShowPortfolio(false);
  };

  const togglePortfolio = () => {
    setShowPortfolio((prev) => !prev);
  };

  return { showPortfolio, openPortfolio, closePortfolio, togglePortfolio };
}
