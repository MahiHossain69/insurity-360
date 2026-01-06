"use client";

import TaskCard from "@/components/scenes/admin/dashboard/taskCard";
import AddTaskSidePanel from "@/components/scenes/admin/tasks/AddTaskSidePanel";
import TaskDetailsSidePanel from "@/components/scenes/admin/tasks/TaskDetailsSidePanel";
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
import Link from "next/link";
import { useState } from "react";

const TodoPage = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [tasks, setTasks] = useState(tasksData);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleSaveTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdateTask = (updated) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setIsDetailsOpen(false);
    setSelectedTask(null);
  };

  const handleSelectTask = (task) => {
    setSelectedTask(task);
    setIsDetailsOpen(true);
  };

  const handleDetailsOpenChange = (open) => {
    setIsDetailsOpen(open);
    if (!open) setSelectedTask(null);
  };

  return (
    <div className="2xl:p-4">
      {/* Page header */}
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
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
                    href="/tasks-todo"
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

        <div className="flex flex-wrap gap-2">
          <Button
            className="font-geist cursor-pointer border-neutral-300 text-sm font-semibold text-white"
            onClick={() => setIsPanelOpen(true)}
          >
            <AddNewPlusIcon className="mr-2 h-4 w-4 text-white" />
            Add New Task
          </Button>
        </div>
      </div>
      {/* Page header */}

      {/* Remaining Tasks */}

      <div className="flex items-center gap-2 pt-4">
        <span className="font-geist text-sm font-semibold text-neutral-500">
          Todo
        </span>{" "}
        <div className="h-px w-full bg-neutral-300" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tasks.map(
          (task, idx) =>
            task.status !== "completed" && (
              <TaskCard
                item={task}
                key={`todo-${idx}`}
                onSelect={handleSelectTask}
              />
            ),
        )}
      </div>

      {/* Remaining Tasks */}

      {/* Completed Tasks */}

      {tasks.filter((task) => task.status === "completed").length > 0 && (
        <>
          <div className="mt-8 flex items-center gap-2">
            <span className="font-geist text-sm font-semibold text-teal-700">
              Completed
            </span>{" "}
            <div className="h-px w-full bg-teal-500" />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tasks.map(
              (task, idx) =>
                task.status === "completed" && (
                  <TaskCard
                    item={task}
                    key={`completed-${idx}`}
                    onSelect={handleSelectTask}
                  />
                ),
            )}
          </div>
        </>
      )}
      {/* Completed Tasks */}

      {/* Add Task Side Panel */}
      <AddTaskSidePanel
        open={isPanelOpen}
        onOpenChange={setIsPanelOpen}
        onSave={handleSaveTask}
      />

      {/* Task Details Side Panel */}
      <TaskDetailsSidePanel
        open={isDetailsOpen}
        onOpenChange={handleDetailsOpenChange}
        onSave={handleUpdateTask}
        task={selectedTask}
      />
    </div>
  );
};

export default TodoPage;
