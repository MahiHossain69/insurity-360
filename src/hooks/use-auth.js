import { useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState({
    name: "hello",
    role: "admin",
  });

  // Helper functions for role checking
  const isSuperAdmin = user?.role === "super_admin";
  const isAdmin = user?.role === "admin";
  const isModerator = user?.role === "moderator";

  return {
    user,
    isSuperAdmin,
    isAdmin,
    isModerator,
    setUser,
  };
};

export default useAuth;
