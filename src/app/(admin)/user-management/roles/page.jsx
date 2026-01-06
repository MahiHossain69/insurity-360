"use client";

import RulesPermissionsFilterDialog from "@/components/scenes/admin/rulesAndPermissions/rolesAndPermissionsFilterDialog";
import RulesPermissionsHeader from "@/components/scenes/admin/rulesAndPermissions/rolesAndPermissionsHeader";
import RulesPermissionsTable from "@/components/scenes/admin/rulesAndPermissions/rolesAndPermissionsTable";
import { useRoles } from "@/contexts/RolesContext";
import { useEffect, useState } from "react";

const RolesPermissionsPage = () => {
  const { roles } = useRoles();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openFilter, setOpenFilter] = useState(false);

  const [roleName, setRoleName] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [startDateFrom, setStartDateFrom] = useState(null);
  const [startDateTo, setStartDateTo] = useState(null);
  const [endDateFrom, setEndDateFrom] = useState(null);
  const [endDateTo, setEndDateTo] = useState(null);

  const [createdDateFrom, setCreatedDateFrom] = useState("");
  const [createdDateTo, setCreatedDateTo] = useState("");

  const handleClearFilter = () => {
    setRoleName("");
    setCreatedBy("");
    setCreatedDateFrom("");
    setCreatedDateTo("");
    setStartDateFrom(null);
    setStartDateTo(null);
    setEndDateFrom(null);
    setEndDateTo(null);
  };

  const filteredData = roles.filter((role) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      (role?.name ?? "").toLowerCase().includes(search) ||
      (role?.createdBy ?? "").toLowerCase().includes(search);

    const matchesRoleName = roleName ? role?.name === roleName : true;
    const matchesCreatedBy = createdBy ? role?.createdBy === createdBy : true;

    let matchesStartDate = true;
    if (startDateFrom)
      matchesStartDate = new Date(role?.startDate) >= new Date(startDateFrom);
    if (matchesStartDate && startDateTo)
      matchesStartDate = new Date(role?.startDate) <= new Date(startDateTo);

    let matchesEndDate = true;
    if (endDateFrom)
      matchesEndDate = new Date(role?.endDate) >= new Date(endDateFrom);
    if (matchesEndDate && endDateTo)
      matchesEndDate = new Date(role?.endDate) <= new Date(endDateTo);

    let matchesCreatedDate = true;
    if (createdDateFrom) {
      matchesCreatedDate =
        new Date(role?.createdAt) >= new Date(createdDateFrom);
    }
    if (matchesCreatedDate && createdDateTo) {
      matchesCreatedDate = new Date(role?.createdAt) <= new Date(createdDateTo);
    }

    return (
      matchesSearch &&
      matchesRoleName &&
      matchesCreatedBy &&
      matchesCreatedDate &&
      matchesStartDate &&
      matchesEndDate
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
      <RulesPermissionsHeader
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
        <RulesPermissionsTable currentData={currentData} />

        <RulesPermissionsFilterDialog
          open={openFilter}
          onOpenChange={setOpenFilter}
          roleName={roleName}
          setRoleName={setRoleName}
          createdBy={createdBy}
          setCreatedBy={setCreatedBy}
          createdDateFrom={createdDateFrom}
          setCreatedDateFrom={setCreatedDateFrom}
          createdDateTo={createdDateTo}
          setCreatedDateTo={setCreatedDateTo}
          startDateFrom={startDateFrom}
          setStartDateFrom={setStartDateFrom}
          startDateTo={startDateTo}
          setStartDateTo={setStartDateTo}
          endDateFrom={endDateFrom}
          setEndDateFrom={setEndDateFrom}
          endDateTo={endDateTo}
          setEndDateTo={setEndDateTo}
          handleClearFilter={handleClearFilter}
        />
      </div>
    </div>
  );
};

export default RolesPermissionsPage;
