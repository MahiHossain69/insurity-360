"use client";

import { claimData } from "@/data/claim";
import { createContext, useContext, useState } from "react";

const ClaimsContext = createContext();

export const useClaimsContext = () => {
  const context = useContext(ClaimsContext);
  if (!context) {
    throw new Error("useClaimsContext must be used within a ClaimsProvider");
  }
  return context;
};

export const ClaimsProvider = ({ children }) => {
  const [claims, setClaims] = useState(claimData);

  // Function to generate unique claim ID
  const generateClaimId = () => {
    const existingIds = claims.map(claim => {
      const idNumber = parseInt(claim.claimId.replace('CLM-', ''));
      return idNumber;
    });
    const maxId = Math.max(...existingIds);
    return `CLM-${(maxId + 1).toString().padStart(4, '0')}`;
  };

  // Function to add new claim
  const addNewClaim = (claimData) => {
    const newClaim = {
      claimId: generateClaimId(),
      ...claimData,
    };
    setClaims(prevClaims => [newClaim, ...prevClaims]);
    return newClaim;
  };

  const value = {
    claims,
    setClaims,
    addNewClaim,
    generateClaimId,
  };

  return (
    <ClaimsContext.Provider value={value}>
      {children}
    </ClaimsContext.Provider>
  );
};