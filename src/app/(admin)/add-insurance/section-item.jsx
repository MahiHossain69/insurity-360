"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
 
import FieldEditor from "./field-editor";
import { useState } from "react";

function FieldsPanel({ sectionIndex, fields, onAdd, onEdit, onRemove, onMove }) {
  const [editorOpen, setEditorOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-geist text-sm font-medium text-neutral-900">Fields</h3>
        <Button variant="outline" className="border-neutral-300" onClick={() => { setEditIndex(null); setEditorOpen(true); }}>
          + Add Field
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {fields.map((f, i) => (
          <div key={i} className="rounded-md border border-neutral-200 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-900">{f.label}</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" className="text-neutral-900" onClick={() => { setEditIndex(i); setEditorOpen(true); }}>
                  Edit
                </Button>
                <Button variant="ghost" className="text-red-700" onClick={() => onRemove(i)}>
                  Remove
                </Button>
              </div>
            </div>
            <div className="mt-2 text-xs text-neutral-500">{f.type} · {f.name}</div>
            <div className="mt-2 flex items-center gap-3">
              <Button variant="outline" className="border-neutral-300" onClick={() => onMove(i, i - 1)} disabled={i === 0}>Up</Button>
              <Button variant="outline" className="border-neutral-300" onClick={() => onMove(i, i + 1)} disabled={i === fields.length - 1}>Down</Button>
            </div>
          </div>
        ))}
      </div>
      <FieldEditor
        open={editorOpen}
        onOpenChange={setEditorOpen}
        initial={editIndex != null ? fields[editIndex] : null}
        onSubmit={(payload) => {
          if (editIndex == null) onAdd(payload);
          else onEdit(editIndex, payload);
          setEditorOpen(false);
        }}
      />
    </div>
  );
}

function SubsectionsPanel({ sectionIndex, subsections, builder }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-geist text-sm font-medium text-neutral-900">Subsections</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-neutral-300" onClick={() => builder.addSubsection(sectionIndex)}>
            + Add Subsection
          </Button>
          <Button variant="ghost" className="text-neutral-900" onClick={() => setExpanded((v) => !v)}>
            {expanded ? "Hide" : "Show"}
          </Button>
        </div>
      </div>
      {expanded && (
        <div className="space-y-4">
          {subsections?.map((sub, j) => (
            <div key={j} className="rounded-md border border-neutral-200 p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-neutral-900">Title</Label>
                  <Input className="border-neutral-300" value={sub.title} onChange={(e) => builder.updateSubsectionTitle(sectionIndex, j, e.target.value)} />
                </div>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-sm text-neutral-900">
                    <Checkbox checked={!!sub.backgroundColor} onCheckedChange={() => builder.toggleSubsectionFlag(sectionIndex, j, "backgroundColor")} className="border-neutral-300" />
                    Background
                  </label>
                </div>
              </div>
              <div className="mt-4">
                <FieldsPanel
                  sectionIndex={sectionIndex}
                  fields={sub.fields || []}
                  onAdd={(payload) => builder.appendSubField(sectionIndex, j, payload)}
                  onEdit={(fieldIndex, payload) => builder.updateSubField(sectionIndex, j, fieldIndex, payload)}
                  onRemove={(fieldIndex) => builder.removeSubField(sectionIndex, j, fieldIndex)}
                  onMove={(from, to) => builder.moveSubField(sectionIndex, j, from, to)}
                />
              </div>
              <div className="mt-4 flex items-center justify-end gap-2">
                <Button variant="ghost" className="text-red-700" onClick={() => builder.removeSubsection(sectionIndex, j)}>Remove Subsection</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SectionItem({ index, section, builder }) {
  const bgStyle = section.backgroundColor ? { backgroundColor: "#F8FAFC" } : undefined;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-geist text-base font-semibold text-neutral-900">{section.title}</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-neutral-300" disabled={index === 0} onClick={() => builder.moveSection(index, index - 1)}>Up</Button>
          <Button variant="outline" className="border-neutral-300" disabled={index === builder.sections.length - 1} onClick={() => builder.moveSection(index, index + 1)}>Down</Button>
          <Button variant="ghost" className="text-red-700" onClick={() => builder.removeSection(index)}>Remove</Button>
        </div>
      </div>
      <div className="rounded-md border border-neutral-200 p-4" style={bgStyle}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-neutral-900">Section Title</Label>
            <Input className="border-neutral-300" value={section.title} onChange={(e) => builder.updateSectionTitle(index, e.target.value)} />
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-neutral-900">
              <Checkbox checked={!!section.backgroundColor} onCheckedChange={() => builder.toggleSectionFlag(index, "backgroundColor")} className="border-neutral-300" />
              Background
            </label>
            <label className="flex items-center gap-2 text-sm text-neutral-900">
              <Checkbox checked={!!section.repeatable} onCheckedChange={() => builder.toggleSectionFlag(index, "repeatable")} className="border-neutral-300" />
              Repeatable
            </label>
          </div>
        </div>
        <div className="mt-6">
          <FieldsPanel
            sectionIndex={index}
            fields={section.fields}
            onAdd={(payload) => builder.appendField(index, payload)}
            onEdit={(fieldIndex, payload) => builder.updateField(index, fieldIndex, payload)}
            onRemove={(fieldIndex) => builder.removeField(index, fieldIndex)}
            onMove={(from, to) => builder.moveField(index, from, to)}
          />
        </div>
        <div className="mt-6">
          <SubsectionsPanel sectionIndex={index} subsections={section.subsections} builder={builder} />
        </div>
      </div>
    </div>
  );
}