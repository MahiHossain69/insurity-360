"use client";

import { Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { formatDateToDDMMMYYYY } from "@/lib/utils";
import { useTaskDetailsForm } from "@/hooks/use-tasks";

export default function TaskDetailsSidePanel({
  open = false,
  onOpenChange = () => {},
  onSave = () => {},
  task = null,
}) {
  const { control, handleSave } = useTaskDetailsForm({ task, onSave, onOpenChange });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="fixed top-0 right-0 left-auto h-full w-full max-w-[640px] translate-x-0 translate-y-0 overflow-y-auto rounded-none border-l border-neutral-200 p-0 shadow-xl transition-transform duration-300 data-[state=closed]:translate-x-full data-[state=open]:translate-x-0"
        showCloseButton
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-[#0b1626]/4 p-6">
            <DialogHeader>
              <DialogTitle className="font-urbanist text-left text-base font-semibold text-neutral-900">
                Task Details
              </DialogTitle>
              <DialogDescription className="sr-only">
                View and edit task details including status, completion date, and other task information.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {!task ? (
              <p className="text-sm text-neutral-500">No task selected.</p>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-lg font-medium text-neutral-900">
                    {task.title}
                  </p>
                  <p className="mt-2 text-sm text-neutral-500">
                    {task.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-[92px_1fr] gap-4">
                    <span className="font-urbanist text-sm font-medium text-neutral-500">
                      Related To
                    </span>
                    <span className="font-urbanist text-sm font-medium text-neutral-900">
                      {task.relatedType}: {task.relatedId}, Customer:{" "}
                      {task.customerName || "—"}
                    </span>
                  </div>
                  <div className="grid grid-cols-[92px_1fr] gap-4">
                    <span className="font-urbanist text-sm font-medium text-neutral-500">
                      Date
                    </span>
                    <span className="font-urbanist text-sm font-medium text-neutral-900">
                      {task.dueDate}
                    </span>
                  </div>
                  <div className="grid grid-cols-[92px_1fr] gap-4">
                    <span className="font-urbanist text-sm font-medium text-neutral-500">
                      Priority
                    </span>
                    <span className="font-urbanist text-sm font-medium text-neutral-900 capitalize">
                      {task.priority}
                    </span>
                  </div>
                  <div className="grid grid-cols-[92px_1fr] gap-4">
                    <span className="font-urbanist text-sm font-medium text-neutral-500">
                      Assigned To
                    </span>
                    <span className="font-urbanist text-sm font-medium text-neutral-900">
                      {task.assignedTo?.name || "—"}
                    </span>
                  </div>
                  <div className="grid grid-cols-[92px_1fr] gap-4">
                    <span className="font-urbanist text-sm font-medium text-neutral-500">
                      Type
                    </span>
                    <span className="font-urbanist text-sm font-medium text-neutral-900">
                      {task.type}
                    </span>
                  </div>
                </div>

                <hr className="border-neutral-200" />

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2">
                    <Controller
                      name="isCompleted"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="completed"
                          checked={!!field.value}
                          onCheckedChange={(val) => field.onChange(!!val)}
                        />
                      )}
                    />
                    <Controller
                      name="isCompleted"
                      control={control}
                      render={({ field }) => (
                        <Label
                          htmlFor="completed"
                          className="font-urbanist text-sm font-medium text-neutral-900"
                        >
                          {field.value ? "Mark as Incomplete" : "Mark as Completed"}
                        </Label>
                      )}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="completedDate"
                      className="font-urbanist text-sm font-medium text-neutral-900"
                    >
                      Completed date
                    </Label>
                    <Controller
                      name="completedDate"
                      control={control}
                      render={({ field }) => (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="font-geist h-9 w-auto cursor-pointer justify-between border border-neutral-300 text-left text-sm font-normal text-neutral-500"
                            >
                              <span>
                                {field.value
                                  ? formatDateToDDMMMYYYY(field.value)
                                  : "DD MMM YYYY"}
                              </span>
                              <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="border-none bg-white p-4"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-neutral-500/4 bg-neutral-50 p-4">
            <div className="flex justify-end gap-1">
              <Button
                variant="outline"
                className="border-neutral-300 bg-transparent"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button className="bg-primary text-white" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
