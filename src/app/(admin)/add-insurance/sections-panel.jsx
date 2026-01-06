"use client";
import { Button } from "@/components/ui/button";
import SectionItem from "./section-item";

export default function SectionsPanel({ builder }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-geist text-base font-semibold text-neutral-900">
          Sections
        </h2>
        <Button
          variant="outline"
          className="border-neutral-300"
          onClick={builder.addSection}
        >
          + Add Section
        </Button>
      </div>
      <div className="space-y-6">
        {builder.sections.map((section, index) => (
          <SectionItem key={index} index={index} section={section} builder={builder} />
        ))}
      </div>
    </div>
  );
}