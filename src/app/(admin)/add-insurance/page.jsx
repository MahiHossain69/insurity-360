"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useInsuranceBuilder } from "@/hooks/use-insurance-builder";
import SectionsPanel from "./sections-panel";

export default function AddInsuranceTypeFormBuilderPage() {
  const builder = useInsuranceBuilder();
  function handleSave() {
    const output = builder.schema;
    // eslint-disable-next-line no-console
    console.log("INSURANCE_SCHEMA_OUTPUT", JSON.stringify(output, null, 2));
  }
  return (
    <div className="mx-auto max-w-5xl space-y-8 p-4">
      <div>
        <h1 className="font-geist mb-1 text-2xl font-semibold text-neutral-900">
          Create New Insurance Type
        </h1>
        <p className="font-geist text-sm text-neutral-500">
          Define sections, fields, and validation rules for your insurance schema.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="font-geist text-sm font-medium text-neutral-900">
            Insurance Type Name
          </Label>
          <Input
            className="border-neutral-300"
            value={builder.typeName}
            onChange={(e) => builder.setTypeName(e.target.value)}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label className="font-geist text-sm font-medium text-neutral-900">
            Description
          </Label>
          <Textarea
            className="border-neutral-300"
            value={builder.description}
            onChange={(e) => builder.setDescription(e.target.value)}
          />
        </div>
      </div>

      <SectionsPanel builder={builder} />

      <div className="flex items-center gap-3">
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          disabled={!builder.canSave}
          onClick={handleSave}
        >
          Save & Console Schema
        </Button>
        <Button
          variant="outline"
          className="border-neutral-300"
          onClick={() => builder.reset()}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
