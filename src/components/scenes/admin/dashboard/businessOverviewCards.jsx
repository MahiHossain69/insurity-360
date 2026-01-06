import { businessOverviewData } from "@/data/business-overview";
import KpiCard from "./kpiCard";

const BusinessOverviewCards = () => {
  return (
    <div className="grid grid-cols-1 gap-4 min-[1600px]:!grid-cols-4 md:grid-cols-2 lg:grid-cols-2">
      {businessOverviewData.map((item) => {
        return <KpiCard key={item.title} item={item} />;
      })}
    </div>
  );
};

export default BusinessOverviewCards;
