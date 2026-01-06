import React, { useMemo } from "react";
import Image from "next/image";

const PremiumWrittenTable = ({ tasks = [] }) => {
  // Process tasks data to group by agent and calculate metrics
  const agentTaskSummary = useMemo(() => {
    const agentMap = new Map();

    tasks.forEach((task) => {
      const agentName = task.assignedTo.name;
      const taskDueDate = new Date(task.dueDate);
      const currentDate = new Date();
      // Set current date to start of day for accurate comparison
      currentDate.setHours(0, 0, 0, 0);
      taskDueDate.setHours(0, 0, 0, 0);
      const isOverdue = taskDueDate < currentDate;
      const agentImage = task.assignedTo.image;
      if (!agentMap.has(agentName)) {
        agentMap.set(agentName, {
          name: agentName,
          role: task.assignedTo.role,
          openTasks: 0,
          overdueTasks: 0,
          image: agentImage,
        });
      }

      const agent = agentMap.get(agentName);
      if (task.status === "pending") {
        agent.openTasks++;
        if (isOverdue) {
          agent.overdueTasks++;
        }
      }
    });

    return Array.from(agentMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [tasks]);

  return (
    <div className="">
      <div className="grid w-full grid-cols-[1fr_1fr_minmax(70px,80px)] border-b border-neutral-200 bg-neutral-50 px-3 py-3.5">
        <div className="text-left text-sm leading-normal font-semibold">
          Agent
        </div>
        <div className="text-left text-sm leading-normal font-semibold">
          Open Tasks
        </div>
        <div className="text-left text-sm leading-normal font-semibold">
          Overdue
        </div>
      </div>
      <div className="scrollbarHidden max-h-[360px] overflow-y-auto">
        {agentTaskSummary.map((agent, index) => (
          <div
            key={agent.name}
            className="grid w-full grid-cols-[1fr_1fr_minmax(70px,80px)] border-b border-neutral-500/4 px-3 py-2.5 hover:bg-neutral-50/50"
          >
            <div className="flex items-center gap-2.5 text-left">
              <Image
                className="h-8 w-8 rounded-full object-cover"
                src={agent.image}
                alt={agent.name}
                width={32}
                height={32}
              />
              <div>
                <div className="text-sm leading-normal font-medium text-neutral-900">
                  {agent.name}
                </div>
                <div className="text-xs leading-normal text-neutral-500">
                  {agent.role}
                </div>
              </div>
            </div>
            <div className="flex items-center text-left">
              <span className={`text-sm leading-normal text-neutral-500`}>
                {agent.openTasks}
              </span>
            </div>
            <div className="flex items-center text-left">
              <span className={`text-sm leading-normal text-neutral-500`}>
                {agent.overdueTasks}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumWrittenTable;
