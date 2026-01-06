"use client";

import HeaderSection from "@/components/layout/client/header";
import SidebarSection from "@/components/layout/client/sidebar";
import ProtectedRoute from "@/components/protected-route";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

const ClientLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // Close sidebar on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Sidebar */}
        <aside>
          <SidebarSection isOpen={sidebarOpen} closeSidebar={closeSidebar} />
        </aside>

        {/* Main content area */}
        <section className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <header className="z-10 flex-shrink-0">
            <HeaderSection toggleSidebar={toggleSidebar} isMobile={true} />
          </header>

          {/* Main content */}
          <section className="flex-1 overflow-y-auto focus:outline-none">
            <section className="min-h-full space-y-4 bg-white p-4">
              {children}
            </section>
          </section>
        </section>

        <Toaster />
      </div>
    </ProtectedRoute>
  );
};

export default ClientLayout;
