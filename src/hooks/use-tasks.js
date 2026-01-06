import { useMemo, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { tasksData } from "@/data/tasks";
import { formatDateToDDMMMYYYY, parseDateDDMMMYYYY } from "@/lib/utils";

export function useAddTaskForm({ onSave = () => {}, onOpenChange = () => {} } = {}) {
  const assigneesList = useMemo(() => {
    const map = new Map();
    for (const t of tasksData) {
      const a = t.assignedTo;
      if (!map.has(a.name)) {
        map.set(a.name, {
          id: a.name,
          name: a.name,
          image: a.image,
          agentType: a.role,
          phone: a.phone || "",
          email: a.email || "",
        });
      }
    }
    return Array.from(map.values());
  }, []);

  const relatedList = useMemo(() => {
    const set = new Set();
    const items = [];
    for (const t of tasksData) {
      const key = `${t.relatedType}||${t.relatedId}`;
      if (!set.has(key)) {
        set.add(key);
        items.push({ key, type: t.relatedType, id: t.relatedId });
      }
    }
    return items;
  }, []);

  const {
    control,
    register,
    reset,
    formState: { errors },
    getValues,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      selectedAssigneeId: "",
      selectedRelatedKey: "",
      taskType: "",
      customerName: "",
      dueDate: null,
    },
  });

  // Watch all fields to trigger re-renders for validation updates
  watch();


  const [submitted, setSubmitted] = useState(false);

  const handleSave = () => {
    const values = getValues();
    const missing = [];
    if (!values.title?.trim()) missing.push("Title");
    if (!values.description?.trim()) missing.push("Details");
    if (!values.selectedAssigneeId) missing.push("Assigned To");
    if (!values.selectedRelatedKey) missing.push("Related To");
    if (!values.dueDate) missing.push("Due Date");
    if (!values.priority) missing.push("Priority");
    if (!values.taskType) missing.push("Type");

    if (missing.length) {
      setSubmitted(true);
      return;
    }

    const person = assigneesList.find(
      (p) => p.id === values.selectedAssigneeId,
    );
    const [relatedType, relatedId] = values.selectedRelatedKey.split("||");

    const newTask = {
      id: `task-${Date.now()}`,
      title: values.title.trim(),
      description: values.description.trim(),
      priority: values.priority,
      status: "pending",
      assignedTo: {
        name: person?.name || "Unassigned",
        image: person?.image || null,
        role: person?.agentType || null,
      },
      relatedType,
      relatedId: relatedId || "",
      customerName: values.customerName?.trim() || "",
      dueDate: values.dueDate ? formatDateToDDMMMYYYY(values.dueDate) : "",
    };

    onSave(newTask);
    onOpenChange(false);
    reset();
    setSubmitted(false);
  };

  const computeFormError = () => {
    const values = getValues();
    const missing = [];
    if (!values.title?.trim()) missing.push("Title");
    if (!values.description?.trim()) missing.push("Details");
    if (!values.selectedAssigneeId) missing.push("Assigned To");
    if (!values.selectedRelatedKey) missing.push("Related To");
    if (!values.dueDate) missing.push("Due Date");
    if (!values.priority) missing.push("Priority");
    if (!values.taskType) missing.push("Type");
    return missing.length ? `Please fill required fields: ${missing.join(", ")}` : "";
  };

  return {
    control,
    register,
    handleSave,
    reset,
    errors,
    getValues,
    assigneesList,
    relatedList,
    computeFormError,
    submitted,
  };
}

export function useTaskDetailsForm({ task, onSave = () => {}, onOpenChange = () => {} } = {}) {
  const { control, handleSubmit, reset, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      isCompleted: task?.status === "completed",
      completedDate: task?.completedDate
        ? parseDateDDMMMYYYY(task.completedDate)
        : null,
    },
  });

  useEffect(() => {
    reset({
      isCompleted: task?.status === "completed",
      completedDate: task?.completedDate
        ? parseDateDDMMMYYYY(task.completedDate)
        : null,
    });
  }, [task, reset]);

  const onSubmit = (values) => {
    if (!task) return;
    const updated = {
      ...task,
      status: values.isCompleted ? "completed" : "pending",
      ...(values.isCompleted && values.completedDate
        ? { completedDate: formatDateToDDMMMYYYY(values.completedDate) }
        : {}),
    };
    onSave(updated);
    onOpenChange(false);
  };

  const handleSave = handleSubmit(onSubmit);

  return { control, handleSave, getValues };
}