"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useMemo, useState } from "react";
import { generateFieldName } from "@/lib/utils";

const TYPES = ["text", "number", "date", "select", "radio", "checkbox", "textarea"];

export default function FieldEditor({ open, onOpenChange, initial, onSubmit }) {
  const [label, setLabel] = useState(initial?.label || "");
  const [name, setName] = useState(initial?.name || "");
  const [type, setType] = useState(initial?.type || "text");
  const [required, setRequired] = useState(!!initial?.required);
  const [validation, setValidation] = useState(initial?.validation || {});
  const [options, setOptions] = useState(initial?.options || []);

  useEffect(() => {
    if (open) {
      setLabel(initial?.label || "");
      setName(initial?.name || "");
      setType(initial?.type || "text");
      setRequired(!!initial?.required);
      setValidation(initial?.validation || {});
      setOptions(initial?.options || []);
    }
  }, [open, initial]);

  useEffect(() => {
    const next = generateFieldName(label, []);
    setName(next);
  }, [label]);

  function updateValidation(key, value) {
    setValidation((prev) => ({ ...prev, [key]: value }));
  }

  function addOption() {
    setOptions((prev) => [...prev, { label: "", value: "" }]);
  }

  function updateOption(i, key, value) {
    setOptions((prev) => prev.map((o, idx) => (idx === i ? { ...o, [key]: value } : o)));
  }

  function removeOption(i) {
    setOptions((prev) => prev.filter((_, idx) => idx !== i));
  }

  function submit() {
    const payload = { label, name, type, required, validation: { ...validation }, options: type === "select" ? options.filter((o) => o.label && o.value) : [] };
    onSubmit(payload);
  }

  const isNumber = type === "number";
  const showTextLength = type === "text" || type === "textarea";
  const showPattern = type === "text";
  const showOptions = type === "select";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Field Editor</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-neutral-900">Field Label</Label>
              <Input className="border-neutral-300" value={label} onChange={(e) => setLabel(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-neutral-900">Field Name</Label>
              <Input className="border-neutral-300" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-neutral-900">Field Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="border-neutral-300 text-neutral-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {TYPES.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm text-neutral-900">
                <Checkbox checked={required} onCheckedChange={(v) => setRequired(!!v)} className="border-neutral-300" />
                Required
              </label>
            </div>
          </div>

          <div className="rounded-md border border-neutral-200 p-3">
            <h4 className="text-sm font-semibold text-neutral-900">Validation</h4>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {isNumber && (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm">Min</Label>
                    <Input type="number" className="border-neutral-300" value={validation.min ?? ""} onChange={(e) => updateValidation("min", e.target.value === "" ? undefined : Number(e.target.value))} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Max</Label>
                    <Input type="number" className="border-neutral-300" value={validation.max ?? ""} onChange={(e) => updateValidation("max", e.target.value === "" ? undefined : Number(e.target.value))} />
                  </div>
                </>
              )}
              {showTextLength && (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm">Min Length</Label>
                    <Input type="number" className="border-neutral-300" value={validation.minLength ?? ""} onChange={(e) => updateValidation("minLength", e.target.value === "" ? undefined : Number(e.target.value))} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Max Length</Label>
                    <Input type="number" className="border-neutral-300" value={validation.maxLength ?? ""} onChange={(e) => updateValidation("maxLength", e.target.value === "" ? undefined : Number(e.target.value))} />
                  </div>
                </>
              )}
              {showPattern && (
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-sm">Pattern</Label>
                  <Input className="border-neutral-300" value={validation.pattern ?? ""} onChange={(e) => updateValidation("pattern", e.target.value || undefined)} />
                </div>
              )}
            </div>
          </div>

          {showOptions && (
            <div className="rounded-md border border-neutral-200 p-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-neutral-900">Select Options</h4>
                <Button variant="outline" className="border-neutral-300" onClick={addOption}>+ Add Option</Button>
              </div>
              <div className="mt-3 space-y-3">
                {options.map((o, i) => (
                  <div key={i} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Input className="border-neutral-300" placeholder="Label" value={o.label} onChange={(e) => updateOption(i, "label", e.target.value)} />
                    <Input className="border-neutral-300" placeholder="Value" value={o.value} onChange={(e) => updateOption(i, "value", e.target.value)} />
                    <div className="sm:col-span-2 flex items-center justify-end"><Button variant="ghost" className="text-red-700" onClick={() => removeOption(i)}>Remove</Button></div>
                  </div>
                ))}
                {!options.length && <div className="text-xs text-neutral-500">No options added.</div>}
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" className="border-neutral-300" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={submit} disabled={!label || !name}>Save Field</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}