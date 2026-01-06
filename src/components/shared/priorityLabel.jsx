import { WarnIcon } from "./svgs";

/**
 * PriorityLabel - A reusable priority label component with customizable colors
 *
 * @param {string} priority - The priority key from data source
 * @param {object} priorityMapping - Maps priority keys to display labels
 * @param {object} backgroundColors - Custom background colors for priority levels
 * @param {object} textColors - Custom text colors for priority levels
 *
 * @example
 * <PriorityLabel
 *   priority="1"
 *   priorityMapping={{ "1": "High", "2": "Medium", "3": "Low" }}
 *   backgroundColors={{ "1": "bg-red-500", "2": "bg-yellow-500", "3": "bg-green-500" }}
 *   textColors={{ "1": "text-white", "2": "text-black", "3": "text-white" }}
 * />
 */

const defaultPriorityMapping = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

const defaultBackgroundColors = {
  high: "bg-red-100",
  medium: "bg-yellow-100",
  low: "bg-primary-light",
};

const defaultTextColors = {
  high: "text-error",
  medium: "text-yellow-600",
  low: "text-primary-dark",
};

const PriorityLabel = ({
  priority,
  priorityMapping = defaultPriorityMapping,
  backgroundColors = defaultBackgroundColors,
  textColors = defaultTextColors,
}) => {
  const displayLabel = priorityMapping[priority] || priority;
  const bgColor = backgroundColors[priority] || "bg-gray-100";
  const textColor = textColors[priority] || "text-gray-600";

  // Convert text color to background color for icon
  const getIconBgColor = (textColorClass) => {
    const colorMap = {
      "text-error": "bg-error",
      "text-yellow-600": "bg-yellow-600",
      "text-primary-dark": "bg-primary-dark",
      "text-gray-600": "bg-gray-600",
    };
    return colorMap[textColorClass] || textColorClass.replace("text-", "bg-");
  };

  const iconBgColor = getIconBgColor(textColor);

  return (
    <div
      className={`flex items-center gap-1 rounded-full py-1 pr-3 pl-1 ${bgColor} h-fit`}
    >
      <div
        className={`flex h-[18px] w-[18px] items-center justify-center rounded-full ${iconBgColor} relative`}
      >
        <WarnIcon className="absolute top-1/2 left-1/2 !h-auto !w-3.5 -translate-x-1/2 -translate-y-1/2 text-white" />
      </div>
      <span className={`text-sm leading-none font-medium ${textColor}`}>
        {displayLabel}
      </span>
    </div>
  );
};

export default PriorityLabel;
