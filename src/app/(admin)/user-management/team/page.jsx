"use client";

import TeamMemberFilterDialog from "@/components/scenes/admin/teamMember/teamMemberFilterDialog";
import TeamMemberHeader from "@/components/scenes/admin/teamMember/teamMemberHeader";
import TeamMemberTable from "@/components/scenes/admin/teamMember/teamMemberTable";
import allTeamMembers from "@/data/team-member";
import { useEffect, useState } from "react";

const TeamMembersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openFilter, setOpenFilter] = useState(false);

  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [startDateFrom, setStartDateFrom] = useState(null);
  const [startDateTo, setStartDateTo] = useState(null);
  const [endDateFrom, setEndDateFrom] = useState(null);
  const [endDateTo, setEndDateTo] = useState(null);
  const [createdDateFrom, setCreatedDateFrom] = useState(null);
  const [createdDateTo, setCreatedDateTo] = useState(null);
  const [lastLoginFrom, setLastLoginFrom] = useState(null);
  const [lastLoginTo, setLastLoginTo] = useState(null);
  const [includeInactive, setIncludeInactive] = useState(false);

  const handleClearFilter = () => {
    setStatus("");
    setRole("");
    setStartDateFrom(null);
    setStartDateTo(null);
    setEndDateFrom(null);
    setEndDateTo(null);
    setCreatedDateFrom(null);
    setCreatedDateTo(null);
    setLastLoginFrom(null);
    setLastLoginTo(null);
    setIncludeInactive(false);
  };

  // Filtering logic
  const filteredData = allTeamMembers.filter((member) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      (member?.name ?? "").toLowerCase().includes(search) ||
      (member?.email ?? "").toLowerCase().includes(search) ||
      (member?.role ?? "").toLowerCase().includes(search) ||
      (member?.status ?? "").toLowerCase().includes(search);

    const matchesStatus = status ? member.status === status : true;
    const matchesRole = role ? member.role === role : true;

    // Dates
    const joinedDate = member.startDate ? new Date(member.startDate) : null;
    const matchesStartDate =
      (!startDateFrom || (joinedDate && joinedDate >= startDateFrom)) &&
      (!startDateTo || (joinedDate && joinedDate <= startDateTo));

    const endedDate = member.endDate ? new Date(member.endDate) : null;
    const matchesEndDate =
      (!endDateFrom || (endedDate && endedDate >= endDateFrom)) &&
      (!endDateTo || (endedDate && endedDate <= endDateTo));

    const createdDate = member.createdDate
      ? new Date(member.createdDate)
      : null;
    const matchesCreatedDate =
      (!createdDateFrom || (createdDate && createdDate >= createdDateFrom)) &&
      (!createdDateTo || (createdDate && createdDate <= createdDateTo));

    const lastLoginDate = member.lastLogin ? new Date(member.lastLogin) : null;
    const matchesLastLogin =
      (!lastLoginFrom || (lastLoginDate && lastLoginDate >= lastLoginFrom)) &&
      (!lastLoginTo || (lastLoginDate && lastLoginDate <= lastLoginTo));

    const matchesInactive = includeInactive
      ? true
      : member.status !== "inactive";

    return (
      matchesSearch &&
      matchesStatus &&
      matchesRole &&
      matchesStartDate &&
      matchesEndDate &&
      matchesCreatedDate &&
      matchesLastLogin &&
      matchesInactive
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
      <TeamMemberHeader
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
        <TeamMemberTable currentData={currentData} />

        <TeamMemberFilterDialog
          open={openFilter}
          onOpenChange={setOpenFilter}
          role={role}
          setRole={setRole}
          status={status}
          setStatus={setStatus}
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
          setLastLoginFrom={setLastLoginFrom}
          setLastLoginTo={setLastLoginTo}
          includeInactive={includeInactive}
          setIncludeInactive={setIncludeInactive}
          handleClearFilter={handleClearFilter}
        />
      </div>
    </div>
  );
};

export default TeamMembersPage;
