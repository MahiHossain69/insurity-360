"use client";

import CommissionLedgerFilterDialog from "@/components/scenes/admin/commission-Ledger/commissionFilterDialog";
import CommissionLedgerHeader from "@/components/scenes/admin/commission-Ledger/commissionLedgerHeader";
import CommissionLedgerTable from "@/components/scenes/admin/commission-Ledger/commissionTable";
import { commissionLedgerData } from "@/data/commission-ledger";
import { useEffect, useState } from "react";

export default function CommissionLedgerPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openFilter, setOpenFilter] = useState(false);

  const [status, setStatus] = useState("");
  const [ledgerType, setLedgerType] = useState(""); // renamed from policyType
  const [productName, setProductName] = useState("");
  const [agent, setAgent] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("");
  const [holderType, setHolderType] = useState("");
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
    setLedgerType("");
    setProductName("");
    setAgent("");
    setPaymentFrequency("");
    setHolderType("");
    setStartDateFrom("");
    setStartDateTo("");
    setEndDateFrom("");
    setEndDateTo("");
    setCreatedDateFrom("");
    setCreatedDateTo("");
    setAutoRenewal(false);
    setDocumentsAttached(false);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  // ✅ Now treating items as commission ledger entries (ledger)
  const filteredData = commissionLedgerData.filter((ledger) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      (ledger.client?.name || "").toLowerCase().includes(search) ||
      (ledger.policyNumber || "").toLowerCase().includes(search) ||
      (ledger.description || "").toLowerCase().includes(search) ||
      (ledger.carrier || "").toLowerCase().includes(search) ||
      (ledger.type || "").toLowerCase().includes(search) ||
      (ledger.broker || "").toLowerCase().includes(search) ||
      (ledger.agent || "").toLowerCase().includes(search) ||
      (ledger.producer || "").toLowerCase().includes(search);

    const matchesFilter =
      (status ? ledger.status === status : true) &&
      (ledgerType ? ledger.type === ledgerType : true) &&
      (productName ? ledger.description.includes(productName) : true) &&
      (agent ? ledger.agent === agent : true) &&
      (paymentFrequency
        ? ledger.paymentFrequency === paymentFrequency
        : true) &&
      (holderType ? ledger.client?.type === holderType : true) &&
      (autoRenewal ? ledger.autoRenewal === true : true) &&
      (documentsAttached ? ledger.documentsAttached === true : true) &&
      (startDateFrom
        ? new Date(ledger.startDate) >= new Date(startDateFrom)
        : true) &&
      (startDateTo
        ? new Date(ledger.startDate) <= new Date(startDateTo)
        : true) &&
      (endDateFrom
        ? new Date(ledger.endDate) >= new Date(endDateFrom)
        : true) &&
      (endDateTo ? new Date(ledger.endDate) <= new Date(endDateTo) : true) &&
      (createdDateFrom
        ? new Date(ledger.createdDate) >= new Date(createdDateFrom)
        : true) &&
      (createdDateTo
        ? new Date(ledger.createdDate) <= new Date(createdDateTo)
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
      <CommissionLedgerHeader
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
        <CommissionLedgerTable currentData={currentData} />

        <CommissionLedgerFilterDialog
          open={openFilter}
          onOpenChange={setOpenFilter}
          status={status}
          setStatus={setStatus}
          ledgerType={ledgerType}
          setLedgerType={setLedgerType}
          productName={productName}
          setProductName={setProductName}
          agent={agent}
          setAgent={setAgent}
          paymentFrequency={paymentFrequency}
          setPaymentFrequency={setPaymentFrequency}
          holderType={holderType}
          setHolderType={setHolderType}
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
