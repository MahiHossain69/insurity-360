"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const ResetDone = () => {
  const router = useRouter();

  return (
    <div>
      <div className="space-y-12">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="bg-success flex h-12 w-12 items-center justify-center rounded-full">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-2 text-2xl font-bold">Done!</h1>
          <p className="text-secondary600">
            Your password has been reset. You can now log in with your new
            password.
          </p>
        </div>
        <div>
          <Button
            type="button"
            className="hover:bg-primary-dark w-full cursor-pointer"
            onClick={() => router.push("/auth/login")}
          >
            Go to login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetDone;
