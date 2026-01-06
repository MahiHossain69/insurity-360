"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

import {
  CompanyActiveIcon,
  CompanyIcon,
  FamilyActiveIcon,
  FamilyIcon,
  GroupActiveIcon,
  GroupIcon,
  IndividualActiveIcon,
  IndividualIcon,
} from "@/components/shared/svgs";
import { IndividualForm } from "./IndividualForm";
import { CompanyForm } from "./companyForm";
import { FamilyForm } from "./familyForm";
import { GroupForm } from "./groupForm";

const policyTypes = [
  {
    id: "individual",
    title: "Individual",
    description: "For policies held by a single person.",
    icon: IndividualIcon,
    activeIcon: IndividualActiveIcon,
  },
  {
    id: "company",
    title: "Company",
    description: "For policies owned by a registered business.",
    icon: CompanyIcon,
    activeIcon: CompanyActiveIcon,
  },
  {
    id: "family",
    title: "Family",
    description: "For policies that apply to multiple family members.",
    icon: FamilyIcon,
    activeIcon: FamilyActiveIcon,
  },
  {
    id: "group",
    title: "Group",
    description: "For policies covering an organization, team, or group.",
    icon: GroupIcon,
    activeIcon: GroupActiveIcon,
  },
];

export function AddNewClientForm({ onClientCreated }) {
  const [selectedPolicyType, setSelectedPolicyType] = useState("individual");

  const renderForm = () => {
    switch (selectedPolicyType) {
      case "individual":
        return <IndividualForm onSubmit={onClientCreated} />;
      case "company":
        return <CompanyForm onSubmit={onClientCreated} />;
      case "family":
        return <FamilyForm onSubmit={onClientCreated} />;
      case "group":
        return <GroupForm onSubmit={onClientCreated} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-4">
        {policyTypes.map((type) => {
          const isActive = selectedPolicyType === type.id;
          const Icon =
            isActive && type.activeIcon ? type.activeIcon : type.icon;
          return (
            <Card
              key={type.id}
              onClick={() => setSelectedPolicyType(type.id)}
              className={`cursor-pointer rounded border py-2 transition-all duration-200 lg:h-39 lg:w-49 ${
                isActive
                  ? "border-blue-500 bg-blue-50 shadow"
                  : "border-neutral-300 bg-white shadow-none"
              }`}
            >
              <CardContent className="-mt-3 flex flex-col items-start p-4">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-lg transition-colors duration-200 ${
                    isActive ? "bg-blue-100" : "bg-neutral-500/4"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 transition-colors duration-200 ${
                      isActive ? "text-blue-700" : "text-neutral-900"
                    }`}
                  />
                </div>
                <h3
                  className={`mt-2 mb-1 font-medium transition-colors duration-200 ${
                    isActive ? "text-blue-700" : "text-neutral-900"
                  }`}
                >
                  {type.title}
                </h3>
                <p className="text-sm leading-4 text-neutral-500">
                  {type.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {renderForm()}
    </div>
  );
}
