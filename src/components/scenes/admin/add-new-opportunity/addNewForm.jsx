"use client";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { opportunitySchema } from "@/schemas/opportunity";
import { zodResolver } from "@hookform/resolvers/zod";
import { addYears } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AdditionalDetails from "./AdditionalDetails";
import DocumentsSection from "./DocumentsSection";
import GeneralInfo from "./GeneralInfo";
import PolicyPeriod from "./PolicyPeriod";
import PremiumPayments from "./PremiumPayments";

export default function AddNewForm() {
  const [activeTab, setActiveTab] = useState("general");
  const tabsOrder = ["general", "policy", "premium", "documents", "additional"];

  const form = useForm({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      policyTitle: "",
      policyCode: "POL-2025-0281",
      issuer: "",
      client: "",
      policyType: "",
      startDate: new Date(2025, 5, 1),
      endDate: addYears(new Date(2025, 5, 1), 5),
      totalPremium: undefined,
      currency: "$ USD",
      premiumFrequency: "",
      paymentMethod: "",
      firstPaymentDate: undefined,
      autoRenewal: false,
      documentName: "",
      uploadedFiles: [],
      additionalNotes: "",
      agent: "",
      producer: "",
    },
    mode: "onChange",
  });

  const nextTab = async () => {
    const currentIndex = tabsOrder.indexOf(activeTab);
    if (activeTab === "general") {
      const ok = await form.trigger(["policyCode", "client", "policyType"]);
      if (!ok) return;
    }
    if (activeTab === "policy") {
      const ok = await form.trigger(["startDate", "endDate"]);
      if (!ok) return;
    }
    if (activeTab === "premium") {
      const ok = await form.trigger([
        "totalPremium",
        "currency",
        "premiumFrequency",
        "paymentMethod",
        "firstPaymentDate",
      ]);
      if (!ok) return;
    }
    const next =
      currentIndex < tabsOrder.length - 1
        ? tabsOrder[currentIndex + 1]
        : tabsOrder[currentIndex];
    setActiveTab(next);
  };

  const submit = form.handleSubmit(() => {});

  return (
    <Form {...form}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="h-auto w-full overflow-x-auto rounded-md bg-neutral-50 p-1 sm:overflow-hidden lg:h-auto">
          <div className="max-w-[800px]">
            <TabsList className="flex min-w-max gap-1">
              {tabsOrder.map((tab, index) => {
                const isActive = activeTab === tab;
                const isCompleted = tabsOrder.indexOf(activeTab) > index;
                return (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className={`font-geist rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap ${
                      isActive
                        ? "bg-white text-blue-700 shadow-sm"
                        : isCompleted
                          ? "text-neutral-500"
                          : "text-neutral-300"
                    }`}
                  >
                    {tab === "general"
                      ? "General Information"
                      : tab === "policy"
                        ? "Policy Period"
                        : tab === "premium"
                          ? "Premium & Payments"
                          : tab === "documents"
                            ? "Documents"
                            : "Additional Details"}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
        </div>

        <TabsContent value="general" className="mt-10">
          <GeneralInfo onNext={nextTab} />
        </TabsContent>

        <TabsContent value="policy" className="mt-10">
          <PolicyPeriod onNext={nextTab} />
        </TabsContent>

        <TabsContent value="premium" className="mt-10">
          <PremiumPayments onNext={nextTab} />
        </TabsContent>

        <TabsContent value="documents" className="mt-10">
          <DocumentsSection onNext={nextTab} />
        </TabsContent>

        <TabsContent value="additional" className="mt-10">
          <AdditionalDetails onSubmit={submit} />
        </TabsContent>
      </Tabs>
    </Form>
  );
}
