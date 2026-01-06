"use client";
import {
  AddNewPlusIcon,
  ArrowUpRightIcon,
  BellIcon,
  DropInfoIcon,
  MailIcon,
  PoliciesSummaryRightIcon,
} from "@/components/shared/svgs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import { PiFolderFill } from "react-icons/pi";
import { AddAccordModal } from "./addAccordModal";
import { DocumentModal } from "./documentModal";
import AddTaskSidePanel from "../../tasks/AddTaskSidePanel";
import { useSearchParams, useRouter } from "next/navigation";
import allPolicyData from "@/data/all-policy";

export default function PoliciesSummary({ clientName: propClientName }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const clientName = propClientName || searchParams.get("name");

  const clientPolicies = allPolicyData.filter(
    (policy) => policy.client.name === clientName,
  );

  const [accordModalOpen, setAccordModalOpen] = useState(false);
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [editingDocId, setEditingDocId] = useState(null);
  const [editName, setEditName] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [accords, setAccords] = useState([
    {
      id: "90",
      fromName: "Auto Loan Application",
      state: "NY",
      editionDate: "12 Mar 2025",
      addedBy: "Faiz Ahmed Jiad",
    },
  ]);

  const addAccord = (formName, state) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const newAccord = {
      id: (accords.length + 90).toString(),
      fromName: formName,
      state: state,
      editionDate: formattedDate,
      addedBy: "Faiz Ahmed Jiad",
    };

    setAccords([...accords, newAccord]);
  };

  const addDocument = (documentData) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const newDocument = {
      id: documents.length + 1,
      name: documentData.name,
      size: documentData.size,
      type: documentData.type,
      date: formattedDate,
      thumbnail: null,
      author: "Faiz Ahmed Jiad",
      authorAvatar: "/images/users/user.png",
    };

    setDocuments([...documents, newDocument]);
  };
  const handleRemove = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
    setActiveDropdown(null);
  };

  const handleEdit = (doc) => {
    setEditingDocId(doc.id);
    setEditName(doc.name);
    setActiveDropdown(null);
  };
  const handleSaveTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const saveEdit = (id) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === id ? { ...doc, name: editName } : doc,
      ),
    );
    setEditingDocId(null);
  };

  return (
    <div>
      <div>
        <div className="mt-6 mb-2 flex items-center justify-between 2xl:mt-8 2xl:pl-4">
          <h1 className="font-geist text-sm font-semibold text-neutral-900">
            Policies Summary
          </h1>
          <div className="flex items-center gap-2">
            <Link href="/policies/add-new-opportunity">
              <Button
                variant="ghost"
                className="font-geist text-sm text-neutral-900"
              >
                <AddNewPlusIcon className="h-5 w-5" />
                Add New Opportunity
              </Button>
            </Link>

            <Button
              variant="ghost"
              className="font-geist text-sm text-neutral-900"
              onClick={() => setIsPanelOpen(true)}
            >
              <AddNewPlusIcon className="h-5 w-5" />
              Add New Task
            </Button>

            <Link href="/policies/claims/add-new-claim">
              <Button
                variant="ghost"
                className="font-geist text-sm text-neutral-900"
              >
                <AddNewPlusIcon className="h-5 w-5" />
                Add Claim
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-2 md:grid-cols-3 2xl:pl-4">
          {clientPolicies.length > 0 ? (
            clientPolicies.map((policy) => {
              const [startDate, endDate] = policy.dateRange
                ? policy.dateRange.split(" - ")
                : ["N/A", "N/A"];
              return (
                <Link
                  key={policy.policyNumber}
                  href={`/policies/${policy.policyNumber}`}
                  className="block h-full"
                >
                  <Card className="group relative h-full border border-neutral-200 bg-neutral-50 p-4 duration-300 ease-in-out hover:border-blue-500 hover:bg-[radial-gradient(100%_167.13%_at_0%_0%,_#FFFFFF_30%,_#DCECFD_70%,_#FFFFFF_100%)]">
                    <div className="space-y-4">
                      <div>
                        <p className="font-urbanist mb-1 text-sm text-neutral-900">
                          {policy.policyNumber}
                        </p>
                        <h2 className="font-urbanist text-xl font-semibold text-neutral-900">
                          {policy.policyType || policy.type}
                        </h2>
                      </div>

                      <div className="flex flex-wrap items-center gap-1">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-500/8 px-2.5 py-1 text-xs text-neutral-900">
                          <span>{policy.type}</span>
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                            policy.status === "Active"
                              ? "bg-[#c7fff4] text-[#058076]"
                              : "bg-neutral-200 text-neutral-600"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              policy.status === "Active"
                                ? "bg-[#04c8b2]"
                                : "bg-neutral-500"
                            }`}
                          ></span>
                          {policy.status}
                        </span>
                      </div>

                      <div>
                        <p className="font-urbanist mb-1 text-sm font-medium text-neutral-500">
                          Duration
                        </p>
                        <div className="font-urbanist flex items-center gap-2 text-sm font-medium text-neutral-900">
                          <span>{startDate}</span>
                          <PoliciesSummaryRightIcon className="font-urbanist h-4 w-4 font-medium text-neutral-500" />
                          <span>{endDate}</span>
                        </div>
                      </div>

                      <div>
                        <p className="font-urbanist mb-1 text-sm font-medium text-neutral-500">
                          Product Plan
                        </p>
                        <p className="text-sm font-medium text-neutral-900">
                          {policy.productPlan}
                        </p>
                      </div>
                    </div>
                    <Button className="absolute top-4 right-5 h-5 w-5 -translate-x-2 translate-y-2 scale-50 bg-transparent !px-0 !py-0 text-blue-500 opacity-0 shadow-none transition-all duration-300 ease-out group-hover:translate-0 group-hover:scale-100 group-hover:opacity-100 hover:bg-transparent">
                      <ArrowUpRightIcon className="size-5" />
                    </Button>
                  </Card>
                </Link>
              );
            })
          ) : (
            <div className="col-span-3 flex h-40 items-center justify-center rounded-lg border border-dashed border-neutral-300">
              <p className="text-neutral-500">
                No policies found for this client.
              </p>
            </div>
          )}
        </div>

        <div className="mb-6 rounded-lg bg-[radial-gradient(100%_100%_at_100%_100%,_#3787EF_30%,_#235BD2_70%,_#3787EF_100%)] p-8 2xl:ml-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-stretch gap-2">
                <span className="font-urbanist text-[40px] font-semibold text-white">
                  125
                </span>
                <span className="font-urbanist mt-2.5 text-sm font-medium text-blue-100">
                  USD
                </span>
              </div>
              <p className="font-urbanist text-sm font-medium text-blue-100">
                Outstanding Amount
              </p>
            </div>

            <div className="flex gap-5">
              <div>
                <p className="font-urbanist mb-1 text-sm font-medium text-blue-100">
                  Payment Mode
                </p>
                <p className="font-urbanist text-sm font-semibold text-white">
                  Credit Card
                </p>
              </div>
              <div className="border border-t-0 border-r-0 border-b-0 border-l-blue-700 pl-4">
                <p className="font-urbanist mb-1 text-sm font-medium text-blue-100">
                  Last Payment Date
                </p>
                <p className="font-urbanist text-sm font-semibold text-white">
                  2025-03-01
                </p>
              </div>
              <div className="border border-t-0 border-r-0 border-b-0 border-l-blue-700 pl-4">
                <p className="font-urbanist mb-1 text-sm font-medium text-blue-100">
                  Next Due Date
                </p>
                <p className="font-urbanist text-sm font-semibold text-white">
                  2026-03-01
                </p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="client-info" className="w-full">
          <div className="h-auto w-full overflow-x-auto bg-neutral-100 p-1 sm:overflow-hidden">
            <div>
              <TabsList className="flex min-w-max gap-1 bg-transparent">
                {[
                  { value: "client-info", label: "Client Info" },
                  { value: "claims", label: "Claims" },
                  { value: "payments", label: "Payments" },
                  { value: "accord", label: "ACCORD" },
                  { value: "documents", label: "Documents" },
                  { value: "notes", label: "Notes" },
                  { value: "correspondence", label: "Correspondence" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="font-gest rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap text-neutral-500 hover:text-neutral-900 data-[state=active]:border-0 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          <TabsContent value="client-info" className="px-4">
            <Card className="border-none shadow-none">
              <div className="space-y-8">
                <div className="border border-t-0 border-r-0 border-b-0 border-l-neutral-200 pl-4">
                  <p className="font-gest mb-2 text-sm font-medium text-neutral-500">
                    Client Name
                  </p>
                  <p className="text-sm font-medium text-neutral-900">
                    Jonathan Blake
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-8 border-t-0 border-r-0 border-b-2 border-l-0 border-dashed border-neutral-200 pb-6">
                  <div className="border border-t-0 border-r-0 border-b-0 border-l-neutral-200 pl-4">
                    <p className="font-gest mb-2 text-sm font-medium text-neutral-500">
                      Date of Birth
                    </p>
                    <p className="text-base text-neutral-900">01 March 1994</p>
                  </div>
                  <div className="border border-t-0 border-r-0 border-b-0 border-l-neutral-200 pl-4">
                    <p className="font-gest mb-2 text-sm font-medium text-neutral-500">
                      Gender
                    </p>
                    <p className="text-base text-neutral-900">Male</p>
                  </div>
                  <div className="border border-t-0 border-r-0 border-b-0 border-l-neutral-200 pl-4">
                    <p className="font-gest mb-2 text-sm font-medium text-neutral-500">
                      Occupation
                    </p>
                    <p className="text-base text-neutral-900">-</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-8 border-t-0 border-r-0 border-b-2 border-l-0 border-dashed border-neutral-200 pb-6">
                  <div className="border border-t-0 border-r-0 border-b-0 border-l-neutral-200 pl-4">
                    <p className="font-gest mb-2 text-sm font-medium text-neutral-500">
                      Driving License Number
                    </p>
                    <p className="text-base text-neutral-900">6655214587</p>
                  </div>
                  <div className="border border-t-0 border-r-0 border-b-0 border-l-neutral-200 pl-4">
                    <p className="font-gest mb-2 text-sm font-medium text-neutral-500">
                      Driving License Image
                    </p>
                    <p className="font-geist text-sm font-medium text-blue-700">
                      mylicense.png
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-8">
                  <div className="border border-t-0 border-r-0 border-b-0 border-l-neutral-200 pl-4">
                    <p className="font-gest mb-2 text-sm font-medium text-neutral-500">
                      Phone Number
                    </p>
                    <p className="text-base text-neutral-900">
                      +1 202-555-0143
                    </p>
                  </div>
                  <div className="border border-t-0 border-r-0 border-b-0 border-l-neutral-200 pl-4">
                    <p className="font-gest mb-2 text-sm font-medium text-neutral-500">
                      Email Address
                    </p>
                    <p className="text-base text-neutral-900">
                      john.doe@email.com
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-8 border-t-0 border-r-0 border-b-2 border-l-0 border-dashed border-neutral-200 pb-6">
                  <div className="border border-t-0 border-r-0 border-b-0 border-l-neutral-200 pl-4">
                    <p className="font-gest mb-2 text-sm font-medium text-neutral-500">
                      Primary Address
                    </p>
                    <div className="max-w-51 space-y-0.5">
                      <p className="font-urbanist text-sm font-medium text-neutral-900">
                        Apartment 5B, Building 32748 Westfield Park
                        AvenueLakewood Heights NeighborhoodLos Angeles, CA
                        90034-2567
                      </p>
                    </div>
                  </div>
                  <div className="border border-t-0 border-r-0 border-b-0 border-l-neutral-200 pl-4">
                    <p className="font-gest mb-2 text-sm font-medium text-neutral-500">
                      Mailing Address
                    </p>
                    <div className="max-w-51 space-y-0.5">
                      <p className="font-urbanist text-sm font-medium text-neutral-900">
                        Apartment 5B, Building 32748 Westfield Park
                        AvenueLakewood Heights NeighborhoodLos Angeles, CA
                        90034-2567
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="claims" className="overflow-y-auto px-4">
            <div className="mt-6 space-y-4">
              <div>
                <h2 className="text-[18px] font-medium text-neutral-900">
                  All Claims
                </h2>
              </div>

              <div className="scrollbarHidden overflow-x-auto">
                <table className="w-full min-w-max text-sm">
                  <thead className="bg-neutral-50">
                    <tr className="border-b border-neutral-200">
                      <th className="font-geist px-2 py-4 text-left text-sm font-semibold text-neutral-900">
                        Claim ID
                      </th>
                      <th className="font-geist px-2 py-4 text-left text-sm font-semibold text-neutral-900">
                        Policy Title
                      </th>
                      <th className="font-geist px-2 py-4 text-left text-sm font-semibold text-neutral-900">
                        Claim Type
                      </th>
                      <th className="font-geist px-2 py-4 text-left text-sm font-semibold text-neutral-900">
                        Claim Amount
                      </th>
                      <th className="font-geist px-2 py-4 text-left text-sm font-semibold text-neutral-900">
                        Filed Date
                      </th>
                      <th className="font-geist px-2 py-4 text-left text-sm font-semibold text-neutral-900">
                        Date of Occurrence
                      </th>
                      <th className="font-geist px-2 py-4 text-left text-sm font-semibold text-neutral-900">
                        Last Updated
                      </th>
                      <th className="font-geist px-2 py-4 text-left text-sm font-semibold text-neutral-900">
                        Assigned Agent
                      </th>
                      <th className="font-geist px-2 py-4 text-left text-sm font-semibold text-neutral-900">
                        Status
                      </th>
                      <th className="w-5"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {[
                      {
                        id: "CLM-1010",
                        policyTitle: "Health Basic Plan",
                        claimType: "Medical",
                        claimAmount: "100,000 $",
                        filedDate: "2025-05-01",
                        dateOfOccurance: "2025-12-17 06:06",
                        lastUpdated: "2025-05-01",
                        assignedAgent: "Sarah Hudson",
                        status: "Filed",
                      },
                      {
                        id: "CLM-1009",
                        policyTitle: "Vehicle Cover Plus",
                        claimType: "Accident",
                        claimAmount: "25,000 $",
                        filedDate: "2025-04-28",
                        dateOfOccurance: "2025-11-26 02:03",
                        lastUpdated: "2025-05-03",
                        assignedAgent: "David Miller",
                        status: "Under Review",
                      },
                      {
                        id: "CLM-1008",
                        policyTitle: "Life Secure Gold",
                        claimType: "Life Benefit",
                        claimAmount: "500,000 $",
                        filedDate: "2025-04-25",
                        dateOfOccurance: "2025-08-04 23:00",
                        lastUpdated: "2025-05-05",
                        assignedAgent: "Rahul Sinha",
                        status: "Approved",
                      },
                    ].map((claim, index) => (
                      <tr
                        key={claim.id}
                        className={`border-b border-neutral-100 ${index === 3 ? "border-b-0" : ""} `}
                      >
                        <td className="font-geist px-2 py-4 text-sm text-neutral-500">
                          {claim.id}
                        </td>
                        <td className="font-geist px-2 py-4 text-sm font-medium text-neutral-900">
                          {claim.policyTitle}
                        </td>
                        <td className="font-geist px-2 py-4 text-sm text-neutral-500">
                          {claim.claimType}
                        </td>
                        <td className="font-geist px-2 py-4 text-sm font-medium text-neutral-900">
                          {claim.claimAmount}
                        </td>
                        <td className="font-geist px-2 py-4 text-sm text-neutral-500">
                          {claim.filedDate}
                        </td>
                        <td className="font-geist px-2 py-4 text-sm text-neutral-500">
                          {claim.dateOfOccurance}
                        </td>
                        <td className="font-geist px-2 py-4 text-sm text-neutral-500">
                          {claim.lastUpdated}
                        </td>
                        <td className="font-geist px-2 py-4 text-sm text-neutral-500">
                          {claim.assignedAgent}
                        </td>
                        <td className="px-2 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                              claim.status === "Filed"
                                ? "bg-neutral-100 text-neutral-600"
                                : claim.status === "Under Review"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                claim.status === "Filed"
                                  ? "bg-neutral-400"
                                  : claim.status === "Under Review"
                                    ? "bg-yellow-500"
                                    : "bg-emerald-500"
                              }`}
                            ></span>
                            {claim.status}
                          </span>
                        </td>
                        <td className="px-2 py-4 text-right">
                          <Button className="flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-neutral-400 shadow-none hover:bg-transparent hover:text-neutral-600">
                            <DropInfoIcon />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="px-4">
            <div className="mt-6 space-y-4">
              <div>
                <h2 className="font-geist text-[18px] font-medium text-neutral-900">
                  Transaction History
                </h2>
              </div>

              <div className="scrollbarHidden overflow-x-auto">
                <table className="w-max text-sm lg:w-full 2xl:w-full">
                  <thead className="bg-neutral-50">
                    <tr className="border-b border-neutral-200">
                      <th className="font-geist px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                        Payment ID
                      </th>
                      <th className="font-geist px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                        Policy
                      </th>
                      <th className="font-geist px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                        Payment Date
                      </th>
                      <th className="font-geist px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                        Method
                      </th>
                      <th className="font-geist px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                        Amount
                      </th>
                      <th className="font-geist px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                        {" "}
                        Status
                      </th>

                      <th className="w-10"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {[
                      {
                        id: "PAY-1010",
                        policyTitle: "Health Protect+",
                        PaymentDate: "2025-04-12",
                        method: "Credit Card",
                        amount: "350.00 $USD",

                        status: "Paid",
                      },
                      {
                        id: "PAY-1009",
                        policyTitle: "Auto Secure Basic",
                        PaymentDate: "2025-04-15",
                        method: "Bank Transfer",
                        amount: "220.00 $USD",

                        status: "Pending",
                      },
                      {
                        id: "PAY-1008",
                        policyTitle: "Family Shield Max",
                        PaymentDate: "2025-03-30",
                        method: "Cash",
                        amount: "480.00 $USD",

                        status: "Paid",
                      },
                    ].map((claim, index) => (
                      <tr
                        key={claim.id}
                        className={`border-b border-neutral-100 ${index === 3 ? "border-b-0" : ""} `}
                      >
                        <td className="font-geist px-6 py-4 text-sm text-neutral-500">
                          {claim.id}
                        </td>
                        <td className="font-geist px-6 py-4 text-sm text-neutral-500">
                          {claim.policyTitle}
                        </td>
                        <td className="font-geist px-6 py-4 text-sm text-neutral-500">
                          {claim.PaymentDate}
                        </td>
                        <td className="font-geist px-6 py-4 text-sm text-neutral-500">
                          {claim.method}
                        </td>
                        <td className="font-geist px-6 py-4 text-sm font-medium text-neutral-900">
                          {claim.amount}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs ${
                              claim.status === "paid"
                                ? "bg-neutral-100 text-neutral-600"
                                : claim.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                claim.status === "paid"
                                  ? "bg-teal-500"
                                  : claim.status === "Pending"
                                    ? "bg-yellow-300"
                                    : "bg-emerald-500"
                              }`}
                            ></span>
                            {claim.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button className="flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-neutral-400 shadow-none hover:bg-transparent hover:text-neutral-600">
                            <DropInfoIcon />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="accord" className="rounded-b-lg px-4">
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-geist text-[18px] font-medium text-neutral-900">
                  All Accords
                </h2>
                <Button
                  className="font-geist flex items-center gap-1 bg-transparent text-sm font-semibold shadow-none hover:bg-transparent"
                  onClick={() => setAccordModalOpen(true)}
                >
                  <AddNewPlusIcon className="h-4 w-4 text-neutral-900" />
                  Add New ACCORD
                </Button>
              </div>

              <div className="scrollbarHidden overflow-x-auto">
                <table className="w-max text-sm lg:w-full 2xl:w-full">
                  <thead className="bg-neutral-50">
                    <tr className="border-b border-neutral-200">
                      <th className="font-geist px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                        Form ID
                      </th>
                      <th className="font-geist px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                        Form Name
                      </th>
                      <th className="font-geist px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                        State
                      </th>
                      <th className="font-geist px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                        Edition Date
                      </th>
                      <th className="font-geist px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                        Added By
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {accords.map((claim, index) => (
                      <tr
                        key={claim.id}
                        className="border-b border-neutral-100"
                      >
                        <td className="font-geist px-6 py-4 text-sm text-neutral-500">
                          {claim.id}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                          {claim.fromName}
                        </td>
                        <td className="font-geist px-6 py-4 text-sm text-neutral-500">
                          {claim.state}
                        </td>
                        <td className="font-geist px-6 py-4 text-sm text-neutral-500">
                          {claim.editionDate}
                        </td>
                        <td className="font-geist px-6 py-4 text-sm text-neutral-500">
                          {claim.addedBy}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <AddAccordModal
              open={accordModalOpen}
              onOpenChange={setAccordModalOpen}
              onConfirm={addAccord}
            />
          </TabsContent>

          <TabsContent value="documents" className="mt-6 space-y-4 px-4">
            <div className="flex items-center justify-between">
              <h1 className="text-[18px] font-medium text-neutral-900">
                Documents
              </h1>
              <Button
                variant="ghost"
                className="text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
                onClick={() => setDocumentModalOpen(true)}
              >
                <Plus className="mr-2 h-5 w-5" />
                Add New Document
              </Button>
            </div>

            {documents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <PiFolderFill className="mb-4 h-16 w-16 text-[#cbd5e1]" />
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                  No documents yet
                </h3>
                <p className="mb-6 text-sm text-neutral-500">
                  Get started by adding your first document
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
                {documents.map((doc) => (
                  <Card
                    key={doc.id}
                    className="overflow-hidden rounded-2xl border-none bg-[#f8fafc] py-0"
                  >
                    <div className="p-1">
                      <div className="flex items-start gap-3">
                        <div className="flex h-32 w-32 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#dbeafe]">
                          {doc.thumbnail ? (
                            <Image
                              src={doc.thumbnail || "/placeholder.svg"}
                              alt={doc.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <PiFolderFill className="h-16 w-16 text-[#93c5fd]" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex items-start justify-between">
                            {editingDocId === doc.id ? (
                              <Input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="mt-4 truncate rounded border border-gray-300 px-2 py-1 text-sm font-semibold text-neutral-900"
                              />
                            ) : (
                              <h3 className="mt-4 truncate text-sm font-semibold text-neutral-900">
                                {doc.name}
                              </h3>
                            )}

                            <div className="relative">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="mt-2.5 h-8 w-8 flex-shrink-0 hover:bg-[#e2e8f0]"
                                onClick={() =>
                                  setActiveDropdown(
                                    activeDropdown === doc.id ? null : doc.id,
                                  )
                                }
                              >
                                <DropInfoIcon className="h-5 w-5 text-neutral-500" />
                              </Button>

                              {activeDropdown === doc.id && (
                                <div className="absolute right-0 z-10 mt-2 w-28 rounded border border-gray-200 bg-white shadow-lg">
                                  <Button
                                    className="block w-full bg-transparent px-4 py-2 text-left text-sm hover:bg-gray-100"
                                    onClick={() => {
                                      setEditingDocId(doc.id);
                                      setEditName(doc.name);
                                      setActiveDropdown(null);
                                    }}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    className="block w-full bg-transparent px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
                                    onClick={() => {
                                      setDocuments(
                                        documents.filter(
                                          (d) => d.id !== doc.id,
                                        ),
                                      );
                                      setActiveDropdown(null);
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>

                          {editingDocId === doc.id && (
                            <div className="mb-2 flex gap-2">
                              <Button
                                size="sm"
                                className="bg-blue-500 text-white"
                                onClick={() => {
                                  setDocuments(
                                    documents.map((d) =>
                                      d.id === doc.id
                                        ? { ...d, name: editName }
                                        : d,
                                    ),
                                  );
                                  setEditingDocId(null);
                                }}
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-neutral-100"
                                onClick={() => setEditingDocId(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          )}

                          <p className="mb-4 text-xs text-neutral-400">
                            {doc.size} • {doc.type} • {doc.date}
                          </p>

                          <div className="mt-8.5 flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={doc.authorAvatar || "/placeholder.svg"}
                                alt={doc.author}
                              />
                              <AvatarFallback className="bg-[#dbeafe] text-xs text-neutral-900">
                                {doc.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-neutral-500">
                              {doc.author}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="notes" className="mt-6 space-y-4 px-4">
            <div>
              <h1 className="text-[18px] font-medium text-neutral-900">
                Notes
              </h1>
            </div>
            <Textarea className="h-26 resize-none border border-neutral-300 focus:ring-0 focus:outline-none focus-visible:ring-[0px]" />
          </TabsContent>

          <TabsContent value="correspondence" className="mt-6 space-y-4 px-4">
            <div className="flex flex-col gap-2">
              <div className="w-full">
                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
                  <div className="flex items-start gap-4 p-6">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                        <MailIcon className="h-6 w-6 text-teal-600" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-grow">
                      <div className="mb-2 flex items-baseline gap-3">
                        <h2 className="text-lg font-semibold text-gray-900">
                          May 10, 2025 – 11:32 AM
                        </h2>
                        <Badge className="flex items-center gap-2 rounded-full bg-neutral-100 text-sm">
                          <span className="text-xs font-medium text-gray-600">
                            Delivered
                          </span>
                          <span className="text-xs font-medium text-gray-600">
                            ·
                          </span>
                          <span className="text-xs font-medium text-gray-600">
                            Opened
                          </span>
                        </Badge>
                      </div>

                      <div className="mt-4 space-y-3 border border-t-0 border-r-0 border-b-0 border-l-neutral-300 pl-4">
                        <div className="text-sm text-neutral-600">
                          <span className="font-medium">Subject:</span> Policy
                          #PL-9827 is Due for Renewal
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                          <p>Dear John,</p>
                          <p>
                            Your policy #PL-9827 is due for renewal on May 20,
                            2025. Please log in to your client portal to renew
                            your policy.
                          </p>
                          <p>– Insurity360 Team</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
                  <div className="flex items-start gap-4 p-6">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                        <BellIcon className="h-6 w-6 text-teal-600" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-grow">
                      <div className="mb-2 flex items-baseline gap-3">
                        <h2 className="text-lg font-semibold text-gray-900">
                          May 06, 2025 – 04:05 PM
                        </h2>
                        <Badge className="flex rounded-full bg-neutral-100 text-xs font-medium text-gray-600">
                          Delivered
                        </Badge>
                      </div>

                      <div className="mt-4 space-y-3 border border-t-0 border-r-0 border-b-0 border-l-neutral-300 pl-4">
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>
                            Your premium of $420 for policy #PL-5450 has been
                            received. Thank you for your payment.
                          </p>
                          <p>– Insurity360 Team</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <DocumentModal
        open={documentModalOpen}
        onOpenChange={setDocumentModalOpen}
        onSave={addDocument}
      />
      <AddTaskSidePanel
        open={isPanelOpen}
        onOpenChange={setIsPanelOpen}
        onSave={handleSaveTask}
      />
    </div>
  );
}
