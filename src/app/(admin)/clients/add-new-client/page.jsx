import React from "react";
import AddNewClientHeader from "@/components/scenes/admin/client/addNewClient/addNewClientHeader";
import { AddNewClientForm } from "@/components/scenes/admin/client/addNewClient/addNewClientForm";
const AddNewClientsPage = () => {
  return (
    <div className="2xl:p-4">
      <AddNewClientHeader />
      <AddNewClientForm />
    </div>
  );
};

export default AddNewClientsPage;
