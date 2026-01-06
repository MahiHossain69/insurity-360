"use client";

import FilterDialog from "@/components/scenes/admin/all-policies/filterDialog";
import PolicyHeader from "@/components/scenes/admin/all-policies/policyHeader";
import PolicyTable from "@/components/scenes/admin/all-policies/policyTable";
import allPolicyData from "@/data/all-policy";
import React, { useState } from "react";

export default function AllpoliciesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openFilter, setOpenFilter] = useState(false);

  const [status, setStatus] = useState("");
  const [policyType, setPolicyType] = useState("");
  const [productName, setProductName] = useState("");
  const [agent, setAgent] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("");
  const [policyHolderType, setPolicyHolderType] = useState("");
  const [startDateFrom, setStartDateFrom] = useState("");
  const [startDateTo, setStartDateTo] = useState("");
  const [endDateFrom, setEndDateFrom] = useState("");
  const [endDateTo, setEndDateTo] = useState("");
  const [createdDateFrom, setCreatedDateFrom] = useState("");
  const [createdDateTo, setCreatedDateTo] = useState("");
  const [autoRenewal, setAutoRenewal] = useState(false);
  const [documentsAttached, setDocumentsAttached] = useState(false);

  const handleClearFilter = () => {
    setStatus("");
    setPolicyType("");
    setProductName("");
    setAgent("");
    setPaymentFrequency("");
    setPolicyHolderType("");
    setStartDateFrom("");
    setStartDateTo("");
    setEndDateFrom("");
    setEndDateTo("");
    setCreatedDateFrom("");
    setCreatedDateTo("");
    setAutoRenewal(false);
    setDocumentsAttached(false);
  };

  const filteredData = allPolicyData.filter(
    (policy) =>
      policy.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  React.useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [rowsPerPage, totalPages, currentPage]);

  return (
    <div className="2xl:p-4">
      <PolicyHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        setOpenFilter={setOpenFilter}
      />

      <div>
        <PolicyTable currentData={currentData} />

        <FilterDialog
          open={openFilter}
          onOpenChange={setOpenFilter}
          status={status}
          setStatus={setStatus}
          policyType={policyType}
          setPolicyType={setPolicyType}
          productName={productName}
          setProductName={setProductName}
          agent={agent}
          setAgent={setAgent}
          paymentFrequency={paymentFrequency}
          setPaymentFrequency={setPaymentFrequency}
          policyHolderType={policyHolderType}
          setPolicyHolderType={setPolicyHolderType}
          startDateFrom={startDateFrom}
          setStartDateFrom={setStartDateFrom}
          startDateTo={startDateTo}
          setStartDateTo={setStartDateTo}
          endDateFrom={endDateFrom}
          setEndDateFrom={setEndDateFrom}
          endDateTo={endDateTo}
          setEndDateTo={setEndDateTo}
          createdDateFrom={createdDateFrom}
          setCreatedDateFrom={setCreatedDateFrom}
          createdDateTo={createdDateTo}
          setCreatedDateTo={setCreatedDateTo}
          autoRenewal={autoRenewal}
          setAutoRenewal={setAutoRenewal}
          documentsAttached={documentsAttached}
          setDocumentsAttached={setDocumentsAttached}
          handleClearFilter={handleClearFilter}
        />
      </div>
    </div>
  );
}
