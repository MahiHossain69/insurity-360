import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const WidgetsModal = ({ isOpen, onClose, widgets, onWidgetToggle }) => {
  const modalRef = useRef(null);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-700 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`fixed top-0 right-0 z-50 flex h-full w-full transform flex-col bg-white shadow-2xl transition-transform duration-700 ease-in-out md:w-120 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-[#F1F5F9] bg-[#F8FAFC] p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Dashboard Widgets
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg p-2 transition-colors duration-200"
            aria-label="Close widgets modal"
          >
            <X className="h-5 w-5 text-neutral-900" />
          </button>
        </div>

        {/* Content */}
        <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {widgets.map((widget) => (
              <div
                key={widget.id}
                className="flex max-h-[52px] items-center justify-between rounded-lg bg-[#F0F7FE] p-4"
              >
                <div className="flex-1">
                  <h3 className="text-base font-medium text-neutral-900">
                    {widget.label}
                  </h3>
                </div>

                {/* Toggle Switch */}
                <label className="relative ml-4 inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={widget.enabled}
                    onChange={() => onWidgetToggle(widget.id)}
                    className="peer sr-only"
                  />
                  <div className="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-500 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

WidgetsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  widgets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      description: PropTypes.string,
      enabled: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onWidgetToggle: PropTypes.func.isRequired,
};

export default WidgetsModal;
