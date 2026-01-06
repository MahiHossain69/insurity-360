import ActivityHeader from "@/components/scenes/admin/all-activity/allActivityHeader";
import ActivityTable from "@/components/scenes/admin/all-activity/allActivityTable";

const ActivityPage = () => {
  return (
    <div className="2xl:p-4">
      <ActivityHeader />
      <ActivityTable />
    </div>
  );
};

export default ActivityPage;
