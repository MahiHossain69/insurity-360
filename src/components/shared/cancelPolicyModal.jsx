import { Button } from "../ui/button";

const CancelPolicyModal = ({ onClose, onConfirm }) => {
  return (
    <div className="authCardShadow flex max-w-[480px] flex-col gap-12 rounded-3xl border border-red-700 bg-white p-12 md:p-16">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900">
          Cancel Policy & Send Document
        </h2>
        <p className="text-secondary600 mt-4 text-sm">
          Are you sure you want to cancel this policy?
        </p>
        <p className="text-secondary600 mt-5 text-sm">
          A formal cancellation document will be automatically generated and
          sent to the client's email.
        </p>
      </div>
      <div className="flex w-full justify-end gap-1">
        <Button
          onClick={onClose}
          className="h-8 rounded-md bg-transparent !px-4 text-neutral-900 shadow-none duration-300 hover:bg-neutral-500/16"
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          className="h-8 rounded-md bg-red-700/16 !px-4 text-red-700 duration-300 hover:bg-red-700 hover:text-white"
        >
          Confirm Cancellation
        </Button>
      </div>
    </div>
  );
};

export default CancelPolicyModal;
