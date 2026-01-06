"use client";

import TaskDetailsSidePanel from "@/components/scenes/admin/tasks/TaskDetailsSidePanel";
import { WarnIcon } from "@/components/shared/svgs";
import { tasksData as staticTasksData } from "@/data/tasks";
import { useEffect, useMemo, useRef, useState } from "react";

const TaskCalendar = ({
  currentMonth,
  tasks = staticTasksData,
  onTaskUpdate,
}) => {
  // State for managing side panels
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);

  // Ref for the calendar container to enable scrolling
  const calendarContainerRef = useRef(null);
  // Generate all days of the current month
  const monthDays = useMemo(() => {
    const days = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push(date);
    }
    return days;
  }, [currentMonth]);

  // Parse date string to Date object for comparison
  const parseTaskDate = (dateString) => {
    if (!dateString) return null;

    // Handle the specific format used in our data: "DD MMM YYYY" (e.g., "13 Dec 2024")
    try {
      // First try direct parsing
      let date = new Date(dateString);

      // If that fails, try parsing the specific format
      if (isNaN(date.getTime())) {
        // Parse format like "13 Dec 2024"
        const parts = dateString.trim().split(" ");
        if (parts.length === 3) {
          const day = parseInt(parts[0]);
          const monthStr = parts[1];
          const year = parseInt(parts[2]);

          const monthMap = {
            Jan: 0,
            Feb: 1,
            Mar: 2,
            Apr: 3,
            May: 4,
            Jun: 5,
            Jul: 6,
            Aug: 7,
            Sep: 8,
            Oct: 9,
            Nov: 10,
            Dec: 11,
          };

          const month = monthMap[monthStr];
          if (month !== undefined && !isNaN(day) && !isNaN(year)) {
            date = new Date(year, month, day);
          }
        }
      }

      return isNaN(date.getTime()) ? null : date;
    } catch (error) {
      return null;
    }
  };

  // Group tasks by date
  const tasksByDate = useMemo(() => {
    const grouped = {};

    monthDays.forEach((day) => {
      const dateKey = day.toDateString();
      grouped[dateKey] = [];
    });

    tasks.forEach((task) => {
      const taskDate = parseTaskDate(task.dueDate);
      if (taskDate) {
        const dateKey = taskDate.toDateString();
        if (grouped[dateKey]) {
          grouped[dateKey].push(task);
        }
      }
    });

    return grouped;
  }, [monthDays, tasks]);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Auto-scroll to current date when component mounts or when viewing current month
  useEffect(() => {
    const scrollToCurrentDate = () => {
      if (!calendarContainerRef.current) return;

      const today = new Date();
      const currentMonthYear = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;
      const todayMonthYear = `${today.getFullYear()}-${today.getMonth()}`;

      // Only auto-scroll if we're viewing the current month
      if (currentMonthYear === todayMonthYear) {
        const todayIndex = monthDays.findIndex((day) => isToday(day));

        if (todayIndex !== -1) {
          // Calculate the scroll position to center the current date
          const dayWidth = 192; // min-w-48 = 192px
          const containerWidth = calendarContainerRef.current.clientWidth;
          const scrollPosition = Math.max(
            0,
            todayIndex * dayWidth - containerWidth / 2 + dayWidth / 2,
          );

          calendarContainerRef.current.scrollTo({
            left: scrollPosition,
            behavior: "smooth",
          });
        }
      }
    };

    // Small delay to ensure the component is fully rendered
    const timeoutId = setTimeout(scrollToCurrentDate, 100);

    return () => clearTimeout(timeoutId);
  }, [currentMonth, monthDays]);

  // Click handlers
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsTaskDetailsOpen(true);
  };

  const handleTaskSave = (updatedTask) => {
    if (onTaskUpdate) {
      onTaskUpdate(updatedTask);
    }
    setIsTaskDetailsOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="flex min-h-[calc(100vh-165px)] w-full flex-col">
      {/* Calendar Grid */}
      <div
        ref={calendarContainerRef}
        className="scrollbar-hide flex-1 overflow-x-auto border border-neutral-200"
      >
        <div className="flex h-full min-w-full">
          {monthDays.map((day, index) => {
            const dateKey = day.toDateString();
            const dayTasks = tasksByDate[dateKey] || [];

            return (
              <div
                key={index}
                className={`flex h-full min-w-48 flex-col border-r border-gray-200 last:border-r-0 ${
                  isToday(day) ? "bg-primary-50" : "bg-white"
                }`}
              >
                {/* Day Header */}
                <div
                  className={`flex-shrink-0 border-b border-gray-200 p-4 ${
                    isToday(day) ? "bg-primary-50" : "bg-neutral-50"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span
                      className={`font-urbanist text-sm leading-none font-medium ${
                        isToday(day) ? "text-blue-900" : "text-neutral-500"
                      }`}
                    >
                      {day.toLocaleDateString("en-US", { weekday: "short" })}
                    </span>
                    <span
                      className={`font-urbanist text-2xl leading-none font-medium ${
                        isToday(day) ? "text-blue-900" : "text-gray-900"
                      }`}
                    >
                      {day.getDate()}
                    </span>
                  </div>
                </div>

                {/* Tasks Column */}
                <div className="flex-1 space-y-1 overflow-y-auto px-1 py-4">
                  {dayTasks.length === 0
                    ? ""
                    : dayTasks.map((task) => (
                        <div
                          key={`task-${task.id}`}
                          onClick={() => handleTaskClick(task)}
                          className={`task-card cursor-pointer rounded-lg border-l-1 p-3 shadow-sm transition-shadow hover:shadow-md ${
                            task.priority === "high"
                              ? "border-l-error bg-red-50"
                              : task.priority === "medium"
                                ? "border-l-yellow-600 bg-yellow-50"
                                : "border-l-primary bg-primary-50"
                          }`}
                        >
                          <div className="mb-2 flex items-center gap-1">
                            <div
                              className={`flex h-[18px] w-[18px] items-center justify-center rounded-full ${
                                task.priority === "high"
                                  ? "bg-error"
                                  : task.priority === "medium"
                                    ? "bg-yellow-600"
                                    : "bg-primary"
                              }`}
                            >
                              <WarnIcon className="h-auto w-2.5 text-white" />
                            </div>
                            <div className="flex w-fit rounded-full bg-neutral-500/4 px-1.5 py-0.5 text-xs font-medium text-neutral-500">
                              <span> {task.assignedTo.name}</span>
                            </div>
                          </div>
                          <h4 className="line-clamp-2 text-sm font-medium text-gray-900">
                            {task.title}
                          </h4>
                        </div>
                      ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Side Panels */}
      <TaskDetailsSidePanel
        open={isTaskDetailsOpen}
        onOpenChange={setIsTaskDetailsOpen}
        onSave={handleTaskSave}
        task={selectedTask}
      />
    </div>
  );
};

export default TaskCalendar;
