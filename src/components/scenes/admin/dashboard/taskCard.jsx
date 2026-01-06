import PriorityLabel from "@/components/shared/priorityLabel";
import { Calendar } from "lucide-react";
import Image from "next/image";

const TaskCard = ({ item, fullHeight = false, onSelect }) => {
  return (
    <div
      className="flex h-full w-full flex-col gap-2 rounded-md border border-neutral-200 bg-neutral-50 cursor-pointer"
      onClick={() => onSelect?.(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onSelect) {
          e.preventDefault();
          onSelect(item);
        }
      }}
    >
      <div className="flex h-full w-full flex-col gap-2 p-1">
        <div
          className={`flex h-full ${fullHeight ? "min-h-[210px]" : ""} grow flex-col rounded-sm bg-neutral-100 p-4`}
        >
          <p className="text-base font-medium text-neutral-900 md:text-lg">
            {item.title}
          </p>
          <p className="mt-2 text-sm text-neutral-500">{item.description}</p>
        </div>
        <div className="px-4">
          <p>
            <span className="text-sm text-neutral-900">Related To :</span>
            <span className="text-sm text-neutral-500">
              {item.relatedType}: {item.relatedId}, Customer:{" "}
              {item.customerName}
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-dashed border-neutral-200 p-2">
        <div className="flex items-center gap-1 rounded-full bg-neutral-100 py-1 pr-3 pl-1">
          <Calendar size={14} className="text-neutral-900" />
          <span className="text-sm font-medium text-neutral-900">
            {item.dueDate}
          </span>
        </div>
        <PriorityLabel priority={item.priority} />

        <div className="flex items-center gap-1 rounded-full bg-neutral-100 py-1 pr-3 pl-1">
          <Image
            src={item.assignedTo.image}
            alt={item.assignedTo.name}
            width={18}
            height={18}
            className="h-[18px] w-[18px] rounded-full object-cover"
          />
          <span className="text-sm font-medium text-neutral-900">
            {item.assignedTo.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
