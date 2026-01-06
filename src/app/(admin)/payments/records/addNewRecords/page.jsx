import AddNewRecordsForm from "@/components/scenes/admin/paymentRecords/newRecords/newRecordsForm";
import AddNewRecordsHeader from "@/components/scenes/admin/paymentRecords/newRecords/newRecordsHeader";
const AddnewRecordsPage = () => {
  return (
    <div className="2xl:p-4">
      <AddNewRecordsHeader />
      <AddNewRecordsForm />
    </div>
  );
};

export default AddnewRecordsPage;
