import { performanceOverviewData } from "@/data/performance-overview";
import KpiCard from "./kpiCard";

const PerformanceOverviewCards = () => {
  return (
    <div className="grid grid-cols-1 gap-4 min-[1600px]:!grid-cols-3 xl:grid-cols-3">
      {performanceOverviewData.map((item) => {
        return <KpiCard key={item.title} item={item} />;
      })}
    </div>
  );
};

export default PerformanceOverviewCards;
