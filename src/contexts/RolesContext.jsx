"use client";

import { createContext, useContext, useState, useEffect } from "react";
import allRolesPermissionsData from "@/data/rules-and-permissions";

const RolesContext = createContext();

export function RolesProvider({ children }) {
  const [roles, setRoles] = useState(allRolesPermissionsData);
  const [nextId, setNextId] = useState(11); // Start after static max id 10

  const addRole = (newRole) => {
    const roleWithId = { ...newRole, id: nextId };
    setRoles((prev) => [...prev, roleWithId].sort((a, b) => a.id - b.id));
    setNextId((prev) => prev + 1);
  };

  return (
    <RolesContext.Provider value={{ roles, addRole }}>
      {children}
    </RolesContext.Provider>
  );
}

export function useRoles() {
  return useContext(RolesContext);
}
