import { Command, FileText, Search, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import allPolicyData from "../../data/all-policy";
import ClientData from "../../data/client";

import { generateUsername } from "@/utils/usernameGenerator";

const SearchModal = ({ isOpen, onClose, recentSearches = [] }) => {
  const router = useRouter();
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ clients: [], policies: [] });

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        // This will be handled by parent component
      }
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Focus input when modal opens
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    } else {
      setQuery(""); // Reset query when closed
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Handle search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults({ clients: [], policies: [] });
      return;
    }

    const lowerQuery = query.toLowerCase().trim();

    const filteredClients = ClientData.filter((client) => {
      const name = client.name ? client.name.toLowerCase() : "";
      const email = client.email ? client.email.toLowerCase() : "";
      const phone = client.phone ? client.phone.toLowerCase() : "";
      const rawPhone = client.phone ? client.phone.replace(/\D/g, "") : "";
      const rawQuery = lowerQuery.replace(/\D/g, "");

      return (
        name.includes(lowerQuery) ||
        email.includes(lowerQuery) ||
        phone.includes(lowerQuery) ||
        (rawQuery.length > 0 && rawPhone.includes(rawQuery))
      );
    });

    const filteredPolicies = allPolicyData.filter((policy) => {
      const policyNumber = policy.policyNumber
        ? policy.policyNumber.toLowerCase()
        : "";
      return policyNumber.includes(lowerQuery);
    });

    setResults({ clients: filteredClients, policies: filteredPolicies });
  }, [query]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const defaultRecentSearches = [
    "Dashboard analytics",
    "User management",
    "Settings",
  ];

  const searchItems =
    recentSearches.length > 0 ? recentSearches : defaultRecentSearches;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex min-h-full items-start justify-center p-4 pt-20">
        <div
          ref={searchRef}
          className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center gap-4 border-b border-gray-100 p-4">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by client name, phone, or policy number..."
              className="flex-1 text-lg placeholder-gray-400 outline-none"
            />
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <kbd className="rounded bg-gray-100 px-2 py-1 text-xs">ESC</kbd>
              <span>to close</span>
            </div>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-4">
            {!query ? (
              <>
                <div className="mb-4 text-sm text-gray-500">
                  Recent searches
                </div>
                <div className="space-y-2">
                  {searchItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex cursor-pointer items-center gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-gray-50"
                      onClick={() => {
                        setQuery(item);
                      }}
                    >
                      <Search className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-6">
                {results.clients.length === 0 &&
                  results.policies.length === 0 && (
                    <div className="py-8 text-center text-gray-500">
                      No results found for "{query}"
                    </div>
                  )}

                {/* Clients Section */}
                {results.clients.length > 0 && (
                  <div>
                    <div className="mb-2 text-xs font-semibold text-gray-500 uppercase">
                      Clients ({results.clients.length})
                    </div>
                    <div className="space-y-2">
                      {results.clients.map((client) => (
                        <div
                          key={client.id}
                          className="flex cursor-pointer items-center gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-gray-50"
                          onClick={() => {
                            const username = generateUsername(
                              client.name,
                              client.id,
                            );
                            router.push(`/clients/${username}`);
                            onClose();
                          }}
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {client.name}
                            </div>
                            <div className="flex gap-2 text-xs text-gray-500">
                              <span>{client.email}</span>
                              <span>•</span>
                              <span>{client.phone}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Policies Section */}
                {results.policies.length > 0 && (
                  <div>
                    <div className="mb-2 text-xs font-semibold text-gray-500 uppercase">
                      Policies ({results.policies.length})
                    </div>
                    <div className="space-y-2">
                      {results.policies.map((policy) => (
                        <div
                          key={policy.policyNumber}
                          className="flex cursor-pointer items-center gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-gray-50"
                          onClick={() => {
                            console.log("Selected policy:", policy);
                            onClose();
                          }}
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {policy.policyNumber}
                            </div>
                            <div className="flex gap-2 text-xs text-gray-500">
                              <span>{policy.policyType}</span>
                              <span>•</span>
                              <span>{policy.client.name}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * SearchButton component for triggering the search modal
 * @param {Object} props - Component props
 * @param {Function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 */
export const SearchButton = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`group flex h-9 w-96 items-center gap-3 rounded-lg border border-gray-200/60 bg-gray-50/80 px-4 text-sm text-gray-500 transition-all duration-200 hover:border-gray-300 hover:bg-gray-100 ${className}`}
    >
      <Search className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
      <span>Search anything...</span>
      <div className="ml-auto flex items-center gap-1 text-xs text-gray-400">
        CTRL /<Command className="h-3 w-3" /> +<span>K</span>
      </div>
    </button>
  );
};

export default SearchModal;
