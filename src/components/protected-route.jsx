"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      // router.replace("/");
      // auth/login
    } else {
      setIsAuth(true);
    }
  }, [router]);

  /*   if (isAuth === null) {
    return <p>Loading...</p>;
  } */

  return <>{children}</>;
}
