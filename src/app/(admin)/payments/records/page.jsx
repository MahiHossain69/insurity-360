"use client";

import React, { useState, useEffect } from "react";
import PaymentRecordsHeader from "@/components/scenes/admin/paymentRecords/paymentRecordsHeader";
import PaymentRecordsTable from "@/components/scenes/admin/paymentRecords/paymentTable";
import PaymentRecordsFilterDialog from "@/components/scenes/admin/paymentRecords/paymentFilterDialog";
import allPaymentRecords from "@/data/payment-records";

const PaymentRecordsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openFilter, setOpenFilter] = useState(false);

  // Filter states
  const [status, setStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [payer, setPayer] = useState("");
  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [createdDateFrom, setCreatedDateFrom] = useState(null);
  const [createdDateTo, setCreatedDateTo] = useState(null);
  const [endDateFrom, setEndDateFrom] = useState(null);
  const [endDateTo, setEndDateTo] = useState(null);
  const [receiptAttached, setReceiptAttached] = useState(false);

  // Clear all filters
  const handleClearFilter = () => {
    setStatus("");
    setPaymentMethod("");
    setTransactionType("");
    setPayer("");
    setAmountFrom("");
    setAmountTo("");
    setDateFrom(null);
    setDateTo(null);
    setCreatedDateFrom(null);
    setCreatedDateTo(null);
    setEndDateFrom(null);
    setEndDateTo(null);
    setReceiptAttached(false);
  };

  // Filter data based on search term
  const filteredData = allPaymentRecords.filter((record) => {
    const search = searchTerm.toLowerCase();
    return (
      (record?.payer ?? "").toLowerCase().includes(search) ||
      (record?.transactionId ?? "").toLowerCase().includes(search) ||
      (record?.status ?? "").toLowerCase().includes(search) ||
      String(record?.amount ?? "")
        .toLowerCase()
        .includes(search)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [rowsPerPage, totalPages, currentPage]);

  return (
    <div className="2xl:p-4">
      <PaymentRecordsHeader
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
        <PaymentRecordsTable currentData={currentData} />

        <PaymentRecordsFilterDialog
          open={openFilter}
          onOpenChange={setOpenFilter}
          status={status}
          setStatus={setStatus}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          transactionType={transactionType}
          setTransactionType={setTransactionType}
          payer={payer}
          setPayer={setPayer}
          amountFrom={amountFrom}
          setAmountFrom={setAmountFrom}
          amountTo={amountTo}
          setAmountTo={setAmountTo}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          createdDateFrom={createdDateFrom}
          setCreatedDateFrom={setCreatedDateFrom}
          createdDateTo={createdDateTo}
          setCreatedDateTo={setCreatedDateTo}
          endDateFrom={endDateFrom}
          setEndDateFrom={setEndDateFrom}
          endDateTo={endDateTo}
          setEndDateTo={setEndDateTo}
          receiptAttached={receiptAttached}
          setReceiptAttached={setReceiptAttached}
          handleClearFilter={handleClearFilter}
        />
      </div>
    </div>
  );
};

export default PaymentRecordsPage;
