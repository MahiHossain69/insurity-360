"use client";

import ClientFilterDialog from "@/components/scenes/admin/client/clientFilterDialog";
import ClientHeader from "@/components/scenes/admin/client/clientHeader";
import ClientTable from "@/components/scenes/admin/client/clientTable";
import ClientData from "@/data/client";
import { useEffect, useState } from "react";

export default function ClientPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openFilter, setOpenFilter] = useState(false);

  const [status, setStatus] = useState("");
  const [clientType, setClientType] = useState("");
  const [productName, setProductName] = useState("");
  const [agent, setAgent] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("");
  const [clientHolderType, setClientHolderType] = useState("");
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
    setClientType("");
    setProductName("");
    setAgent("");
    setPaymentFrequency("");
    setClientHolderType("");
    setStartDateFrom("");
    setStartDateTo("");
    setEndDateFrom("");
    setEndDateTo("");
    setCreatedDateFrom("");
    setCreatedDateTo("");
    setAutoRenewal(false);
    setDocumentsAttached(false);
  };

  // ✅ Filtering against client fields
  const filteredData = ClientData.filter((client) => {
    const search = searchTerm.toLowerCase();
    return (
      client.name.toLowerCase().includes(search) ||
      client.email.toLowerCase().includes(search) ||
      client.phone.toLowerCase().includes(search) ||
      client.agentName.toLowerCase().includes(search) ||
      client.country.toLowerCase().includes(search)
    );
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
      <ClientHeader
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
        <ClientTable currentData={currentData} />

        <ClientFilterDialog
          open={openFilter}
          onOpenChange={setOpenFilter}
          status={status}
          setStatus={setStatus}
          clientType={clientType}
          setClientType={setClientType}
          productName={productName}
          setProductName={setProductName}
          agent={agent}
          setAgent={setAgent}
          paymentFrequency={paymentFrequency}
          setPaymentFrequency={setPaymentFrequency}
          clientHolderType={clientHolderType}
          setClientHolderType={setClientHolderType}
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
