"use client";

import PolicyDetails from "@/components/scenes/admin/all-policies/policyDetails";
import ClientProfile from "@/components/scenes/admin/client/clientList/clientProfile";
import { Button } from "@/components/ui/button";
import allPolicyData from "@/data/all-policy";
import { useParams, useRouter } from "next/navigation";

export default function PolicyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = decodeURIComponent(params.id);
  const policy = allPolicyData.find((p) => p.policyNumber === id);

  if (!policy) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-neutral-900">
          Policy Not Found
        </h2>
        <p className="mt-2 text-neutral-500">
          The policy you are looking for does not exist.
        </p>
        <Button className="mt-4" onClick={() => router.push("/policies/all")}>
          Back to All Policies
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col 2xl:h-[calc(100vh-62px)] 2xl:flex-row 2xl:overflow-hidden">
      <div className="scrollbar-hide w-full 2xl:h-full 2xl:max-w-[512px] 2xl:overflow-y-auto">
        <ClientProfile
          hideLinkProfileOption={true}
          clientData={policy.client}
        />
      </div>
      <div className="w-full min-w-0 2xl:h-full">
        <PolicyDetails policy={policy} />
      </div>
    </div>
  );
}
