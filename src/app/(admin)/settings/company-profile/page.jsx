import { CompanyProfileForm } from "@/components/scenes/admin/settings/companyProfile/companyProfileForm";
import CompanyProfileHeader from "@/components/scenes/admin/settings/companyProfile/companyProfileHeader";

const CompanyProfilePage = () => {
  return (
    <div className="2xl:p-4">
      <CompanyProfileHeader />
      <CompanyProfileForm />
    </div>
  );
};

export default CompanyProfilePage;
