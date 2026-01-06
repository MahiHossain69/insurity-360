import { tasksData } from "@/data/tasks";
import { useMemo } from "react";
import PremiumWrittenTable from "./premiumWrittenTable";

const TotalPremiumWrittenSection = () => {
  // Calculate dynamic task statistics
  const taskStats = useMemo(() => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const todayEnd = new Date(currentDate);
    todayEnd.setHours(23, 59, 59, 999);

    const next7Days = new Date(currentDate);
    next7Days.setDate(currentDate.getDate() + 7);

    let openTasks = 0;
    let overdueTasks = 0;
    let dueTodayTasks = 0;
    let upcomingTasks = 0;

    tasksData.forEach((task) => {
      const taskDueDate = new Date(task.dueDate);
      taskDueDate.setHours(0, 0, 0, 0);

      if (task.status === "pending") {
        openTasks++;

        // Check if overdue
        if (taskDueDate < currentDate) {
          overdueTasks++;
        }
        // Check if due today
        else if (taskDueDate.getTime() === currentDate.getTime()) {
          dueTodayTasks++;
        }
        // Check if upcoming (next 7 days, excluding today)
        else if (taskDueDate > currentDate && taskDueDate <= next7Days) {
          upcomingTasks++;
        }
      }
    });

    return {
      openTasks,
      overdueTasks,
      dueTodayTasks,
      upcomingTasks,
    };
  }, []);

  return (
    <div className="rounded-md border border-neutral-200">
      <div className="border-b border-neutral-200 px-5 py-3.5">
        <div className="text-base font-medium">Total Premium Written</div>
      </div>
      <div className="flex items-center justify-between gap-6 bg-neutral-100 p-4 lg:gap-8">
        <div className="">
          <p className="text-2xl leading-none text-neutral-900 md:text-3xl lg:text-[32px]">
            {taskStats.openTasks}
          </p>
          <p className="mt-2 text-base text-neutral-900">Open Tasks</p>
        </div>

        <div className="flex gap-6 lg:gap-8">
          <div>
            <p className="text-error text-xl md:text-2xl">
              {taskStats.overdueTasks}
            </p>
            <p className="text-error mt-1 text-sm leading-snug">Overdue</p>
          </div>
          <div>
            <p className="text-primary text-xl md:text-2xl">
              {taskStats.dueTodayTasks}
            </p>
            <p className="text-primary mt-1 text-sm leading-snug">Due Today</p>
          </div>
          <div>
            <p className="text-xl text-teal-700 md:text-2xl">
              {taskStats.upcomingTasks}
            </p>
            <p className="mt-1 text-sm leading-snug text-teal-700">
              Upcoming (Next 7 Days)
            </p>
          </div>
        </div>
      </div>
      <PremiumWrittenTable tasks={tasksData} />
    </div>
  );
};

export default TotalPremiumWrittenSection;
