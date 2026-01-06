"use client";

import InvoiceTable from "@/components/scenes/admin/invoices/invoiceTable";
import InvoiceFilterDialog from "@/components/scenes/admin/invoices/invoicesFilterDialog";
import InvoiceRecordsHeader from "@/components/scenes/admin/invoices/invoicesHeader";
import allInvoicesData from "@/data/invoices";
import { useEffect, useState } from "react";

const InvoicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openFilter, setOpenFilter] = useState(false);

  const [status, setStatus] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");
  const [invoiceDateFrom, setInvoiceDateFrom] = useState("");
  const [invoiceDateTo, setInvoiceDateTo] = useState("");
  const [dueDateFrom, setDueDateFrom] = useState("");
  const [dueDateTo, setDueDateTo] = useState("");

  const handleClearFilter = () => {
    setStatus("");
    setIssuedBy("");
    setAmountFrom("");
    setAmountTo("");
    setInvoiceDateFrom("");
    setInvoiceDateTo("");
    setDueDateFrom("");
    setDueDateTo("");
  };

  const filteredData = allInvoicesData.filter((invoice) => {
    const search = searchTerm.toLowerCase();

    return (
      (invoice?.client?.name ?? "").toLowerCase().includes(search) ||
      (invoice?.invoiceId ?? "").toLowerCase().includes(search) ||
      (invoice?.status ?? "").toLowerCase().includes(search) ||
      String(invoice?.amount ?? "")
        .toLowerCase()
        .includes(search)
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
      <InvoiceRecordsHeader
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
        <InvoiceTable currentData={currentData} />

        <InvoiceFilterDialog
          open={openFilter}
          onOpenChange={setOpenFilter}
          status={status}
          setStatus={setStatus}
          issuedBy={issuedBy}
          setIssuedBy={setIssuedBy}
          amountFrom={amountFrom}
          setAmountFrom={setAmountFrom}
          amountTo={amountTo}
          setAmountTo={setAmountTo}
          invoiceDateFrom={invoiceDateFrom}
          setInvoiceDateFrom={setInvoiceDateFrom}
          invoiceDateTo={invoiceDateTo}
          setInvoiceDateTo={setInvoiceDateTo}
          dueDateFrom={dueDateFrom}
          setDueDateFrom={setDueDateFrom}
          dueDateTo={dueDateTo}
          setDueDateTo={setDueDateTo}
          handleClearFilter={handleClearFilter}
        />
      </div>
    </div>
  );
};

export default InvoicesPage;
