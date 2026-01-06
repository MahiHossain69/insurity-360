import { salesPerformanceData } from "@/data/sales-performance";
import SalesPerformanceCard from "./salesPerformanceCard";

export const SalesPerformanceGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 min-[1600px]:!grid-cols-3 xl:grid-cols-3">
      {salesPerformanceData.map((item) => {
        return <SalesPerformanceCard key={item.title} item={item} />;
      })}
    </div>
  );
};
