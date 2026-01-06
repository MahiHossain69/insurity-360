import AddNewRolePageForm from "@/components/scenes/admin/rulesAndPermissions/addNewRole/addNewRoleForm";
import AddNewRolePageHeader from "@/components/scenes/admin/rulesAndPermissions/addNewRole/addNewRoleHeader";
const AddNewRolePage = () => {
  return (
    <div className="2xl:p-4">
      <AddNewRolePageHeader />
      <AddNewRolePageForm />
    </div>
  );
};

export default AddNewRolePage;
