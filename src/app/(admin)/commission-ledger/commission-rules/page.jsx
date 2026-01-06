"use client";

import CommissionRulesFilterDialog from "@/components/scenes/admin/commission-Ledger/commissionRules/commissionRulesFilterDialog";
import CommissionRulesHeader from "@/components/scenes/admin/commission-Ledger/commissionRules/commissionRulesHeader";
import CommissionRulesTable from "@/components/scenes/admin/commission-Ledger/commissionRules/commissionRulesTable";
import { commissionRulesData } from "@/data/commission-rules";
import { useEffect, useState } from "react";

export default function CommissionRulesPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openFilter, setOpenFilter] = useState(false);

  const [status, setStatus] = useState("");
  const [policyType, setPolicyType] = useState("");
  const [carrier, setCarrier] = useState("");

  const handleClearFilter = () => {
    setStatus("");
    setPolicyType("");
    setCarrier("");
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const filteredData = commissionRulesData.filter((rule) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      (rule.policyType || "").toLowerCase().includes(search) ||
      (rule.carrier || "").toLowerCase().includes(search) ||
      (rule.brokerage || "").toLowerCase().includes(search) ||
      (rule.agent || "").toLowerCase().includes(search) ||
      (rule.producer || "").toLowerCase().includes(search);

    const matchesFilter =
      (status ? rule.status === status : true) &&
      (policyType ? rule.policyType === policyType : true) &&
      (carrier ? rule.carrier === carrier : true);

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [rowsPerPage, totalPages, currentPage]);

  return (
    <div className="2xl:p-4">
      <CommissionRulesHeader
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        setOpenFilter={setOpenFilter}
      />

      <div>
        <CommissionRulesTable currentData={currentData} />

        <CommissionRulesFilterDialog
          open={openFilter}
          onOpenChange={setOpenFilter}
          status={status}
          setStatus={setStatus}
          policyType={policyType}
          setPolicyType={setPolicyType}
          carrier={carrier}
          setCarrier={setCarrier}
          handleClearFilter={handleClearFilter}
        />
      </div>
    </div>
  );
}
