"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { useAddTaskForm } from "@/hooks/use-tasks";
import { formatDateToDDMMMYYYY } from "@/lib/utils";

export default function AddTaskSidePanel({
  open = false,
  onOpenChange = () => {},
  onSave = () => {},
}) {
  const {
    register,
    control,
    assigneesList,
    relatedList,
    handleSave,
    computeFormError,
    submitted,
    reset,
  } = useAddTaskForm({ onSave, onOpenChange });

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
                Add New Task
              </DialogTitle>
              <DialogDescription className="sr-only">
                Create a new task by filling out the form with title,
                description, assignee, and other task details.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {submitted && computeFormError() && (
                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {computeFormError()}
                </div>
              )}

              <div className="space-y-2">
                <Label className="font-geist text-sm font-medium text-neutral-900">
                  Title
                </Label>
                <Input
                  placeholder="Enter task title"
                  {...register("title")}
                  className="h-9 border-neutral-300 bg-white shadow-none focus-visible:ring-0"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="font-geist text-sm font-medium text-neutral-900">
                  Details
                </Label>
                <Textarea
                  placeholder="Add a short description"
                  {...register("description")}
                  className="focus-visible:border-primary h-[72px] resize-none border-neutral-300 bg-white shadow-none focus-visible:ring-0"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="font-geist text-sm font-medium text-neutral-900">
                  Assigned To
                </Label>
                <Controller
                  name="selectedAssigneeId"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className="h-9 w-full bg-white"
                        aria-required="true"
                      >
                        {field.value ? (
                          (() => {
                            const person = assigneesList.find(
                              (p) => p.id === field.value,
                            );
                            return (
                              <div className="flex items-center gap-2">
                                <Image
                                  src={
                                    person?.image ||
                                    "/images/users/kamala-blake.webp"
                                  }
                                  alt={person?.name || "Assignee"}
                                  width={24}
                                  height={24}
                                  className="h-6 w-6 rounded-xs object-cover"
                                />
                                <span className="text-sm text-neutral-900">
                                  {person?.name}
                                </span>
                              </div>
                            );
                          })()
                        ) : (
                          <SelectValue placeholder="Select assignee" />
                        )}
                      </SelectTrigger>
                      <SelectContent className="bg-white **:cursor-pointer">
                        {assigneesList.map((assigned) => (
                          <SelectItem
                            key={assigned.id}
                            value={assigned.id}
                            className="py-2"
                          >
                            <div className="flex items-start gap-3">
                              <Image
                                src={assigned.image}
                                alt={assigned.name}
                                width={32}
                                height={32}
                                className="h-8 w-8 rounded-xs object-cover"
                              />
                              <div className="space-y-1">
                                <p className="text-sm text-neutral-900">
                                  {assigned.name}
                                </p>
                                <p className="text-xs text-neutral-500">
                                  {assigned.agentType} &nbsp; • &nbsp;
                                  {assigned.phone} • {assigned.email}
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label className="font-geist text-sm font-medium text-neutral-900">
                  Related To
                </Label>
                <Controller
                  name="selectedRelatedKey"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className="w-full bg-white"
                        aria-required="true"
                      >
                        <SelectValue placeholder="Select related item" />
                      </SelectTrigger>
                      <SelectContent className="bg-white **:cursor-pointer">
                        {relatedList.map((r) => (
                          <SelectItem key={r.key} value={r.key}>
                            {r.type} : {r.id}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="font-geist text-sm font-medium text-neutral-900">
                    Due Date
                  </Label>
                  <Controller
                    name="dueDate"
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="font-geist h-9 w-full cursor-pointer justify-between border border-neutral-300 text-left text-sm font-normal text-neutral-500"
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

                <div className="hidden sm:block" />

                <div className="space-y-2">
                  <Label className="font-geist text-sm font-medium text-neutral-900">
                    Priority
                  </Label>
                  <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className="w-full bg-white"
                          aria-required="true"
                        >
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent className="bg-white **:cursor-pointer">
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="hidden sm:block" />

                <div className="space-y-2">
                  <Label className="font-geist text-sm font-medium text-neutral-900">
                    Type
                  </Label>
                  <Controller
                    name="taskType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className="w-full bg-white"
                          aria-required="true"
                        >
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white **:cursor-pointer">
                          <SelectItem value="Personal">Personal</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-500/4 bg-neutral-50 p-4">
            <div className="flex justify-end gap-1">
              <Button
                variant="outline"
                className="border-neutral-300 bg-transparent"
                onClick={() => {
                  onOpenChange(false);
                  reset();
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="font-geist bg-primary text-white"
              >
                Assign Task
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
