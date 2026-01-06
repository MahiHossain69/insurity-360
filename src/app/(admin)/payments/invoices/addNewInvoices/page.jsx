import AddNewInvoicesForm from "@/components/scenes/admin/invoices/addInvoices/addInvoicesForm";
import AddNewInvoicesHeader from "@/components/scenes/admin/invoices/addInvoices/addInvoicesHeader";
const AddNewInvoicesPage = () => {
  return (
    <div className="2xl:p-4">
      <AddNewInvoicesHeader />
      <AddNewInvoicesForm />
    </div>
  );
};

export default AddNewInvoicesPage;
