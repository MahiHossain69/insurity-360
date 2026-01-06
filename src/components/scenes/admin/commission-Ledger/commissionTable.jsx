"use client";

import CommissionStatusBadge from "@/components/scenes/admin/commission-Ledger/commissionStatusBadge";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { commissionLedgerData } from "@/data/commission-ledger";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";

function RenewableBadge({ renewable }) {
  const isYes = renewable === "Yes";
  return (
    <Badge
      variant="outline"
      className={`${
        isYes ? "bg-teal-100 text-teal-700" : "bg-red-100 text-red-700"
      } font-geist flex items-center gap-1 !rounded-full border-none px-2 py-1 text-xs font-medium`}
    >
      <GoDotFill
        className={`h-3 w-3 ${isYes ? "text-teal-500" : "text-red-700"}`}
      />
      {renewable}
    </Badge>
  );
}

export default function CommissionTable() {
  const [ledgerData, setLedgerData] = useState(commissionLedgerData);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...ledgerData];
    updatedData[index][field] = value;
    setLedgerData(updatedData);
  };

  return (
    <div className="scrollbarHidden overflow-x-auto rounded-b-sm border border-t-0 border-neutral-200">
      <table className="w-max 2xl:min-w-full">
        <thead>
          <tr className="border-b border-neutral-500/8 bg-neutral-50">
            {[
              "Policy #",
              "Carrier",
              "Type",
              "Premium",
              "Commission",
              "Broker",
              "Agent",
              "Producer",
              "Brokerage Share",
              "Agent Share",
              "Producer Share",
              "Rule Source",
              "Renewable",
              "Commission Date",
              "Commission Status",
            ].map((head, i) => (
              <th
                key={i}
                className="font-geist px-4 py-3 text-left text-sm font-medium text-neutral-900"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {ledgerData.map((policy, index) => (
            <tr
              key={policy.policyNumber}
              className={`border-b border-neutral-500/8 hover:bg-neutral-500/4 ${
                index % 2 === 0 ? "bg-white" : "bg-white"
              }`}
            >
              <td className="px-4 py-3">
                <div>
                  <div className="font-geist text-sm font-medium text-neutral-900">
                    {policy.policyNumber}
                  </div>
                  <div className="font-geist text-xs text-neutral-500">
                    {policy.description}
                  </div>
                </div>
              </td>

              <td className="px-4 py-3 text-sm text-neutral-500">
                {policy.carrier}
              </td>

              <td className="px-4 py-3 text-sm text-neutral-500">
                {policy.type}
              </td>

              <td className="font-geist px-4 py-3 text-right text-sm font-medium text-neutral-900">
                {policy.premium}
              </td>

              <td className="font-geist px-4 py-3 text-right text-sm font-medium text-neutral-900">
                {policy.commission}
              </td>

              <td className="px-4 py-3 text-sm text-neutral-500">
                {policy.broker}
              </td>

              <td className="px-4 py-3 text-sm text-neutral-500">
                {policy.agent}
              </td>

              <td className="px-4 py-3 text-sm text-neutral-500">
                {policy.producer}
              </td>

              <td className="font-geist px-4 py-3 text-sm text-neutral-900">
                <Input
                  type="text"
                  value={policy.brokerageShare}
                  onChange={(e) =>
                    handleInputChange(index, "brokerageShare", e.target.value)
                  }
                  className="font-geist h-9 w-25 rounded border border-neutral-300 px-2 py-1 text-xs text-neutral-900 focus:border-neutral-300"
                />
              </td>

              <td className="font-geist px-4 py-3 text-sm text-neutral-900">
                <Input
                  type="text"
                  value={policy.agentShare}
                  onChange={(e) =>
                    handleInputChange(index, "agentShare", e.target.value)
                  }
                  className="font-geist h-9 w-25 rounded border border-neutral-300 px-2 py-1 text-xs text-neutral-900 focus:border-neutral-300"
                />
              </td>

              <td className="font-geist px-4 py-3 text-sm text-neutral-900">
                <Input
                  type="text"
                  value={policy.producerShare}
                  onChange={(e) =>
                    handleInputChange(index, "producerShare", e.target.value)
                  }
                  className="font-geist h-9 w-25 rounded border border-neutral-300 px-2 py-1 text-xs text-neutral-900 focus:border-neutral-300"
                />
              </td>

              <td className="px-4 py-3 text-sm text-neutral-500">
                {policy.ruleSource}
              </td>

              <td className="px-4 py-3">
                <RenewableBadge renewable={policy.renewable} />
              </td>

              <td className="px-4 py-3 text-sm text-neutral-500">
                {policy.commissionDate}
              </td>

              <td className="px-4 py-3">
                <CommissionStatusBadge status={policy.commissionStatus} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
