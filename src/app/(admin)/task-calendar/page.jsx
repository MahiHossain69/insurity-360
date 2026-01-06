"use client";

import TaskCalendar from "@/components/scenes/admin/tasks-calendar/taskCalendar";
import AddTaskSidePanel from "@/components/scenes/admin/tasks/AddTaskSidePanel";
import { AddNewPlusIcon } from "@/components/shared/svgs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { tasksData } from "@/data/tasks";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TaskCalendarPage = () => {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  // State for AddTaskSidePanel and tasks management
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [tasks, setTasks] = useState(tasksData);

  const navigateMonth = (direction) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newDate);
  };

  // Handler for opening AddTaskSidePanel
  const handleAddNewTask = () => {
    setIsAddTaskOpen(true);
  };

  // Handler for saving new task
  const handleNewTaskSave = (newTask) => {
    // Add the new task to the tasks state
    setTasks((prevTasks) => [...prevTasks, newTask]);
    // Close the panel
    setIsAddTaskOpen(false);
  };

  // Handler for updating existing task
  const handleTaskUpdate = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
  };
  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col gap-4 px-4 pt-4 sm:justify-between md:flex-row">
        {/* Breadcrumb + Title */}
        <div className="flex flex-col gap-1">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/"
                    className="font-urbanist text-sm font-normal text-neutral-500"
                  >
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-neutral-500" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/tasks-calendar"
                    className="font-urbanist text-sm font-normal text-neutral-900"
                  >
                    Tasks
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="font-urbanist text-xl font-medium text-neutral-900 sm:text-2xl">
            Tasks
          </h1>
        </div>

        <div className="flex h-fit flex-wrap justify-center gap-2 sm:justify-start">
          <Button
            variant="outline"
            onClick={() => router.push("/tasks-todo")}
            className="font-geist cursor-pointer border-neutral-300 text-sm font-semibold text-neutral-900"
          >
            Status Wise View
          </Button>
          <Button
            onClick={handleAddNewTask}
            className="font-geist cursor-pointer border-neutral-300 text-sm font-semibold text-white"
          >
            <AddNewPlusIcon className="mr-2 h-4 w-4 text-white" />
            Add New Task
          </Button>
          <div className="mx-2 my-auto hidden h-6 w-px bg-neutral-200 sm:block" />

          <div className="flex gap-1.5">
            <Button
              onClick={() => navigateMonth(-1)}
              className="rounded-md bg-neutral-500/8 text-neutral-900 duration-200 hover:bg-neutral-500/16"
            >
              <ArrowLeft className="!h-5 !w-auto" />
            </Button>
            <div className="flex h-9 min-w-36 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 px-6 text-sm text-neutral-900 select-none">
              {currentMonth.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </div>

            <Button
              onClick={() => navigateMonth(1)}
              className="rounded-md bg-neutral-500/8 text-neutral-900 duration-200 hover:bg-neutral-500/16"
            >
              <ArrowRight className="!h-5 !w-auto" />
            </Button>
          </div>
        </div>
      </div>
      {/* Page header */}
      <div className="mt-4 flex justify-center">
        <TaskCalendar
          currentMonth={currentMonth}
          tasks={tasks}
          onTaskUpdate={handleTaskUpdate}
        />
      </div>

      {/* AddTaskSidePanel */}
      <AddTaskSidePanel
        open={isAddTaskOpen}
        onOpenChange={setIsAddTaskOpen}
        onSave={handleNewTaskSave}
      />
    </div>
  );
};

export default TaskCalendarPage;
