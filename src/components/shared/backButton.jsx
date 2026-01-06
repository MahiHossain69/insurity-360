"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const BackButton = ({ className, children, onClick, ...props }) => {
  const router = useRouter();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }
    router.back();
  };

  return (
    <Button
      type="button"
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children ?? "Back"}
    </Button>
  );
};

export default BackButton;
