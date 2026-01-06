import AddNewClaimHeader from "@/components/scenes/admin/claims/addNewClaim/addNewClaimHeader";
import AddNewClaimForm from "@/components/scenes/admin/claims/addNewClaim/addNewClaimForm";
import React from "react";

const AddNewClaimPage = () => {
  return (
    <div className="2xl:p-4">
      <AddNewClaimHeader />
      <AddNewClaimForm />
    </div>
  );
};

export default AddNewClaimPage;
