import ClaimsStatusOverview from "@/components/scenes/admin/dashboard/ClaimsStatusOverview";
import MonthlyPremiumChart from "@/components/scenes/admin/dashboard/MonthlyPremiumChart";
import PolicyCategoriesChart from "@/components/scenes/admin/dashboard/PolicyCategoriesChart";
import RevenueByProductLineChart from "@/components/scenes/admin/dashboard/RevenueByProductLineChart";
import TaskManagerChart from "@/components/scenes/admin/dashboard/TaskManagerChart";
import TotalPoliciesSoldChart from "@/components/scenes/admin/dashboard/TotalPoliciesSoldChart";
import BusinessOverviewCards from "@/components/scenes/admin/dashboard/businessOverviewCards";
import PerformanceOverviewCards from "@/components/scenes/admin/dashboard/performanceOverviewCards";
import RecentActivityCarousel from "@/components/scenes/admin/dashboard/recentActivityCarousel";
import StatsCard from "@/components/scenes/admin/dashboard/statsCard";
import {
  claimsStatusData,
  monthlyPremiumData,
  policyCategories,
} from "@/data/charts";
import { revenueByProductLineData, taskManagerData } from "@/data/task-manager";
import { totalPoliciesSoldData } from "@/data/total-policies-sold";

import LeadAgentCarousel from "@/components/scenes/admin/dashboard/LeadAgentCarousel";
import TotalPremiumWrittenSection from "@/components/scenes/admin/dashboard/TotalPremiumWrittenSection";
import { SalesPerformanceGrid } from "@/components/scenes/admin/dashboard/salesPerformanceGrid";
import TaskCarousel from "@/components/scenes/admin/dashboard/taskCarousel";
import { statsOverview } from "@/data/stats-overview";
import TopPerformingAgents from "@/components/scenes/admin/dashboard/topPerformingAgents";

const DashboardOverviewPage = () => {
  return (
    <div className="space-y-4 2xl:p-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 min-[1600px]:!grid-cols-6 sm:grid-cols-2 md:grid-cols-3">
        {statsOverview.map((stat, index) => (
          <StatsCard key={index} stat={stat} />
        ))}
      </div>
      {/* Top 5 Policy Categories & Monthly Premium Collection */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PolicyCategoriesChart
          data={policyCategories}
          title="Top 5 Policy Categories"
        />
        <MonthlyPremiumChart
          data={monthlyPremiumData}
          title="Monthly Premium Collection"
        />
      </div>

      {/* claims status overview & tasks clients soon */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ClaimsStatusOverview data={claimsStatusData} />
        <TaskCarousel />
      </div>
      {/* Recent Activity */}
      <RecentActivityCarousel />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TaskManagerChart data={taskManagerData} />
        <RevenueByProductLineChart data={revenueByProductLineData} />
      </div>
      <BusinessOverviewCards />
      <TopPerformingAgents />
      <LeadAgentCarousel />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TotalPremiumWrittenSection />
        <TotalPoliciesSoldChart data={totalPoliciesSoldData} />
      </div>

      <SalesPerformanceGrid />
      <PerformanceOverviewCards />
    </div>
  );
};

export default DashboardOverviewPage;
