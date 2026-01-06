const IconButton = ({
  children,
  ariaLabel,
  onClick,
  className = "",
  hasNotification = false,
  variant = "default",
}) => {
  const baseClasses =
    "group relative cursor-pointer px-1 transition-all duration-200 hover:bg-neutral-500/16 size-8 inline-flex items-center justify-center rounded-md";

  const variantClasses = {
    default: "text-neutral-900 hover:text-gray-700",
    primary:
      "bg-blue-50/80 text-blue-500 hover:bg-blue-100 hover:text-blue-700 focus:ring-blue-100",
    danger:
      "bg-red-50/80 text-red-500 hover:bg-red-100 hover:text-red-700 focus:ring-red-100",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <div className="transition-transform duration-200">{children}</div>

      {hasNotification && (
        <span className="absolute top-0 right-3 inline-block h-2 w-2 rounded-full border-4 border-[#D7005D29] bg-[#D7005D] shadow-lg" />
      )}
    </button>
  );
};

export default IconButton;
