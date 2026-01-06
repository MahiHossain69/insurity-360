"use client";

import ClaimsFilterDialog from "@/components/scenes/admin/claims/claimsFilterDialog";
import ClaimsHeader from "@/components/scenes/admin/claims/claimsHeader";
import ClaimsTable from "@/components/scenes/admin/claims/claimsTable";
import { useClaimsContext } from "@/contexts/ClaimsContext";
import { useEffect, useState } from "react";

const ClaimsPage = () => {
  const { claims } = useClaimsContext();
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openFilter, setOpenFilter] = useState(false);

  const [claimStatus, setClaimStatus] = useState("");
  const [claimType, setClaimType] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [claimantName, setClaimantName] = useState("");
  const [agent, setAgent] = useState("");
  const [clientType, setClientType] = useState("");
  const [claimDateFrom, setClaimDateFrom] = useState("");
  const [claimDateTo, setClaimDateTo] = useState("");
  const [occurrenceDateFrom, setOccurrenceDateFrom] = useState("");
  const [occurrenceDateTo, setOccurrenceDateTo] = useState("");
  const [lastUpdatedFrom, setLastUpdatedFrom] = useState("");
  const [lastUpdatedTo, setLastUpdatedTo] = useState("");

  const handleClearFilter = () => {
    setClaimStatus("");
    setClaimType("");
    setPolicyNumber("");
    setClaimantName("");
    setAgent("");
    setClientType("");
    setClaimDateFrom("");
    setClaimDateTo("");
    setOccurrenceDateFrom("");
    setOccurrenceDateTo("");
    setLastUpdatedFrom("");
    setLastUpdatedTo("");
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const filteredData = claims.filter((claim) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      (claim.clientName || "").toLowerCase().includes(search) ||
      (claim.policyTitle || "").toLowerCase().includes(search) ||
      (claim.claimType || "").toLowerCase().includes(search) ||
      (claim.assignedAgent || "").toLowerCase().includes(search);

    const matchesFilter =
      (claimStatus ? claim.status === claimStatus : true) &&
      (claimType ? claim.claimType === claimType : true) &&
      (policyNumber ? claim.policyNumber === policyNumber : true) &&
      (claimantName ? claim.clientName === claimantName : true) &&
      (agent ? claim.assignedAgent === agent : true) &&
      (clientType ? claim.clientType === clientType : true) &&
      (claimDateFrom
        ? new Date(claim.filedDate) >= new Date(claimDateFrom)
        : true) &&
      (claimDateTo
        ? new Date(claim.filedDate) <= new Date(claimDateTo)
        : true) &&
      (occurrenceDateFrom
        ? new Date(claim.dateOfOccurrence) >= new Date(occurrenceDateFrom)
        : true) &&
      (occurrenceDateTo
        ? new Date(claim.dateOfOccurrence) <= new Date(occurrenceDateTo)
        : true) &&
      (lastUpdatedFrom
        ? new Date(claim.lastUpdated) >= new Date(lastUpdatedFrom)
        : true) &&
      (lastUpdatedTo
        ? new Date(claim.lastUpdated) <= new Date(lastUpdatedTo)
        : true);

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
      <ClaimsHeader
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
        <ClaimsTable currentData={currentData} />

        <ClaimsFilterDialog
          open={openFilter}
          onOpenChange={setOpenFilter}
          claimStatus={claimStatus}
          setClaimStatus={setClaimStatus}
          claimType={claimType}
          setClaimType={setClaimType}
          policyNumber={policyNumber}
          setPolicyNumber={setPolicyNumber}
          claimantName={claimantName}
          setClaimantName={setClaimantName}
          agent={agent}
          setAgent={setAgent}
          clientType={clientType}
          setClientType={setClientType}
          claimDateFrom={claimDateFrom}
          setClaimDateFrom={setClaimDateFrom}
          claimDateTo={claimDateTo}
          setClaimDateTo={setClaimDateTo}
          occurrenceDateFrom={occurrenceDateFrom}
          setOccurrenceDateFrom={setOccurrenceDateFrom}
          occurrenceDateTo={occurrenceDateTo}
          setOccurrenceDateTo={setOccurrenceDateTo}
          lastUpdatedFrom={lastUpdatedFrom}
          setLastUpdatedFrom={setLastUpdatedFrom}
          lastUpdatedTo={lastUpdatedTo}
          setLastUpdatedTo={setLastUpdatedTo}
          handleClearFilter={handleClearFilter}
        />
      </div>
    </div>
  );
};

export default ClaimsPage;
