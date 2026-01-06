"use client";
import { CalendarIcon, PolicyTrashIcon } from "@/components/shared/svgs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogTitle } from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import ClientData from "@/data/client";
import insuranceTypes from "@/data/insurance_types.json";
import { useInsuranceSelect } from "@/hooks/use-insurance-select";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChevronDown, Plus, Search } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { GoArrowRight } from "react-icons/go";
import { AddNewClientForm } from "./NewOpportunitySheet/addNewClientForm";

export default function GeneralInfo({ onNext }) {
  const [clients, setClients] = useState(ClientData);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [error, setError] = useState(false);
  const { setValue } = useFormContext();

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAddNewClient = (newClientData) => {
    const newClient = {
      id: Date.now(),
      ...newClientData,
      avatar: newClientData.avatar || "/images/users/user.png",
    };
    setClients((prev) => [...prev, newClient]);
    setValue("client", newClient.name);
    setSheetOpen(false);
    setOpen(false);
  };

  const policyTypeOptions = useMemo(() => {
    const types = insuranceTypes.map((t) => t.insuranceType).filter(Boolean);
    return Array.from(new Set(types));
  }, []);

  return (
    <>
      <div className="mb-6 max-w-full lg:max-w-4xl">
        <h1 className="font-geist mb-2 text-2xl font-semibold text-neutral-900">
          General Information
        </h1>
        <p className="font-geist text-sm font-normal text-neutral-500 sm:w-150">
          Basic info to identify and classify the policy. These fields help
          categorize the policy and associate it with a product.
        </p>
      </div>

      <div className="mt-9 max-w-full space-y-4 lg:max-w-4xl">
        <div className="space-y-1" style={{ maxWidth: "800px" }}>
          <Label
            htmlFor="policy-title"
            className="font-geist text-sm font-medium text-neutral-900"
          >
            Policy Title{" "}
            <span className="-mt-2 text-[10px] font-semibold text-neutral-400">
              OPTIONAL
            </span>
          </Label>
          <FormField
            name="policyTitle"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="policy-title"
                    className="w-full border-neutral-300"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-1" style={{ maxWidth: "194px" }}>
          <Label
            htmlFor="policy-code"
            className="font-geist text-sm font-medium text-neutral-900"
          >
            Policy Code
          </Label>
          <FormField
            name="policyCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="policy-code"
                    className="w-full border-neutral-300"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div
          className="mt-8 mb-8 h-[1px] w-full bg-neutral-200"
          style={{ maxWidth: "800px" }}
        ></div>

        <div className="space-y-1" style={{ maxWidth: "800px" }}>
          <Label
            htmlFor="issuer"
            className="font-geist text-sm font-medium text-neutral-900"
          >
            Issuer{" "}
            <span className="-mt-2 text-[10px] font-semibold text-neutral-400">
              OPTIONAL
            </span>
          </Label>
          <FormField
            name="issuer"
            render={({ field }) => (
              <FormItem>
                <Select
                  value={field.value || ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full border-neutral-300 text-neutral-400">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="font-geist bg-white">
                    <SelectItem value="nrma" className="hover:bg-neutral-50">
                      <div className="flex items-center">
                        <Image
                          src="/icons/user-logo.png"
                          alt="NRMA"
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        NRMA Insurance
                      </div>
                    </SelectItem>
                    <SelectItem value="metlife" className="hover:bg-neutral-50">
                      <div className="flex items-center">
                        <Image
                          src="/icons/user-logo2.png"
                          alt="MetLife"
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        MetLife Insurance
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full max-w-[800px] space-y-1.5">
          <Label className="text-sm font-medium text-neutral-900">Client</Label>
          <FormField
            name="client"
            render={({ field }) => {
              const selectedClient = clients.find(
                (c) => c.name === field.value,
              );
              return (
                <FormItem>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "h-10 w-full justify-between border-neutral-200 px-3 font-normal text-neutral-400",
                          open && "border-blue-500 ring-1 ring-blue-500",
                          error && "border-red-500",
                          selectedClient && "text-neutral-900",
                        )}
                      >
                        {selectedClient
                          ? selectedClient.name
                          : "Select a client or create one"}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] border-neutral-100 bg-white p-0 shadow-none">
                      <div className="space-y-2">
                        <div className="mb-0 flex gap-2 bg-neutral-50 p-3">
                          <div className="relative flex-1">
                            <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                            <Input
                              placeholder="Search"
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                              className="border-neutral-300 bg-white pl-2 focus-visible:border-neutral-300"
                            />
                          </div>
                          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                            <SheetTrigger asChild>
                              <Button
                                variant="outline"
                                className="gap-1.5 rounded-md border-neutral-300 bg-transparent px-4 py-2 font-semibold text-neutral-900"
                              >
                                <Plus className="h-4 w-4" />
                                Create Client
                              </Button>
                            </SheetTrigger>
                            <SheetContent
                              side="right"
                              className="w-100 overflow-y-auto sm:min-w-220"
                            >
                              <SheetHeader className="font-urbanist bg-blue-50 p-4 text-2xl font-medium">
                                Add New Client
                              </SheetHeader>
                              <VisuallyHidden>
                                <DialogTitle>Create New Client</DialogTitle>
                              </VisuallyHidden>
                              <AddNewClientForm
                                onClientCreated={handleAddNewClient}
                              />
                            </SheetContent>
                          </Sheet>
                        </div>

                        <div className="scrollbar-hide max-h-65 space-y-0.5 overflow-y-auto p-2">
                          {filteredClients.map((client, index) => (
                            <Button
                              key={client.id || index}
                              onClick={() => {
                                field.onChange(client.name);
                                setOpen(false);
                              }}
                              className="flex h-12 w-full items-center justify-start gap-3 rounded-lg bg-white p-2 text-left shadow-none hover:bg-neutral-50"
                            >
                              <Avatar className="h-8 w-8 rounded-sm">
                                <AvatarImage src={client.avatar} />
                                <AvatarFallback>
                                  {client.name[0]}
                                </AvatarFallback>
                              </Avatar>

                              <div>
                                <p className="text-sm text-neutral-900">
                                  {client.name}
                                </p>
                                <p className="flex gap-2 text-xs text-neutral-500">
                                  <span>{client.type}</span>
                                  <span>•</span>
                                  <span>{client.phone}</span>
                                  <span>•</span>
                                  <span>{client.email}</span>
                                </p>
                              </div>
                            </Button>
                          ))}

                          {filteredClients.length === 0 && (
                            <p className="py-6 text-center text-sm text-neutral-400">
                              No client found
                            </p>
                          )}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div
          className="mt-8 mb-8 h-[1px] w-full bg-neutral-200"
          style={{ maxWidth: "800px" }}
        ></div>

        <div className="space-y-1" style={{ maxWidth: "800px" }}>
          <Label
            htmlFor="policy-type"
            className="font-geist text-sm font-medium text-neutral-900"
          >
            Policy Type
          </Label>
          <FormField
            name="policyType"
            render={({ field }) => (
              <FormItem>
                <Select
                  value={field.value || ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full border-neutral-300 text-neutral-400">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {policyTypeOptions.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DynamicSections />

        <div
          className="mt-8 mb-8 h-[1px] w-full bg-neutral-200"
          style={{ maxWidth: "800px" }}
        ></div>
      </div>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Button
          onClick={onNext}
          className="font-geist flex h-9 w-23 cursor-pointer items-center justify-center bg-blue-500 text-sm font-semibold text-white hover:bg-blue-600 sm:w-auto"
        >
          Next <GoArrowRight className="ml-1 h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="font-geist w-full cursor-pointer text-sm font-semibold text-neutral-900 hover:!bg-neutral-300 hover:text-neutral-800 sm:w-auto"
        >
          Cancel
        </Button>
      </div>
    </>
  );
}

function DynamicSections() {
  const { control, watch } = useFormContext();
  const policyType = watch("policyType");
  const {
    schema,
    getOptions,
    getFieldPath,
    useRepeating,
    getAddLabel,
    getValidation,
    isBackground,
  } = useInsuranceSelect(control, policyType);
  const [dateOpen, setDateOpen] = useState({});

  function DateField({ name }) {
    const id = name;
    const open = !!dateOpen[id];
    function setOpen(v) {
      setDateOpen((prev) => ({ ...prev, [id]: v }));
    }
    return (
      <FormField
        name={name}
        render={({ field }) => (
          <FormItem>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="font-geist h-9 w-full cursor-pointer justify-start border-neutral-300 text-left text-sm font-normal text-neutral-400"
                >
                  {field.value
                    ? new Date(field.value).toLocaleDateString()
                    : "DD MMM YYYY"}
                  <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="border-none bg-white p-4"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(day) => {
                    field.onChange(day);
                    setOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  function RadioBoolean({ name }) {
    return (
      <FormField
        name={name}
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm text-neutral-900">
                <input
                  type="radio"
                  checked={field.value === true}
                  onChange={() => field.onChange(true)}
                  className="h-4 w-4"
                />
                Yes
              </label>
              <label className="flex items-center gap-2 text-sm text-neutral-900">
                <input
                  type="radio"
                  checked={field.value === false}
                  onChange={() => field.onChange(false)}
                  className="h-4 w-4"
                />
                No
              </label>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  function FieldRenderer({ field, name }) {
    const rules = getValidation(field);
    if (field.type === "text") {
      return (
        <FormField
          name={name}
          rules={rules}
          render={({ field: f }) => (
            <FormItem>
              <FormControl>
                <Input className="w-full border-neutral-300" {...f} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
    if (field.type === "number") {
      return (
        <FormField
          name={name}
          rules={rules}
          render={({ field: f }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  className="w-full border-neutral-300"
                  {...f}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
    if (field.type === "textarea") {
      return (
        <FormField
          name={name}
          rules={rules}
          render={({ field: f }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className={`border-neutral-300 ${field.className || ""}`}
                  rows={field.rows}
                  placeholder={field.placeholder}
                  {...f}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
    if (field.type === "date") return <DateField name={name} />;
    if (field.type === "radio") return <RadioBoolean name={name} />;
    if (field.type === "checkbox") {
      return (
        <FormField
          name={name}
          rules={rules}
          render={({ field: f }) => (
            <FormItem>
              <Checkbox
                checked={!!f.value}
                onCheckedChange={(v) => f.onChange(!!v)}
                className="border-neutral-300"
              />
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
    if (field.type === "select") {
      const options = getOptions(field.name);
      return (
        <FormField
          name={name}
          rules={rules}
          render={({ field: f }) => (
            <FormItem>
              <Select value={f.value || ""} onValueChange={f.onChange}>
                <SelectTrigger className="w-full border-neutral-300 text-neutral-400">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {options.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
    return null;
  }

  if (!policyType || !schema.length) return null;

  return (
    <div className="space-y-8" style={{ maxWidth: "800px" }}>
      {schema.map((section) =>
        section.repeatable ? (
          <RepeatableSection
            key={section.title}
            section={section}
            getFieldPath={getFieldPath}
            getAddLabel={getAddLabel}
            isBackground={isBackground}
            FieldRenderer={FieldRenderer}
            useRepeating={useRepeating}
          />
        ) : (
          <BasicSection
            key={section.title}
            section={section}
            getFieldPath={getFieldPath}
            isBackground={isBackground}
            FieldRenderer={FieldRenderer}
          />
        ),
      )}
    </div>
  );
}

function BasicSection({ section, getFieldPath, isBackground, FieldRenderer }) {
  const bg = isBackground(section) ? { backgroundColor: "#F8FAFC" } : undefined;
  const hasTextarea = section.fields.some((f) => f.type === "textarea");

  return (
    <div className="space-y-4">
      <h2 className="font-geist text-base font-semibold text-neutral-900">
        {section.title}
      </h2>
      <div className={cn("rounded-md p-4", hasTextarea && "pr-0")} style={bg}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {section.fields.map((f) => {
            const name = getFieldPath(section.title, null, f.name);
            const colSpan = f.fullWidth ? "md:col-span-2" : "";
            return (
              <div key={name} className={`space-y-1 ${colSpan}`}>
                <Label className="font-geist text-sm font-medium text-neutral-900">
                  {f.label}
                </Label>
                <FieldRenderer field={f} name={name} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RepeatableSection({
  section,
  getFieldPath,
  getAddLabel,
  isBackground,
  FieldRenderer,
  useRepeating,
}) {
  const bg = isBackground(section) ? { backgroundColor: "#F8FAFC" } : undefined;
  const fa = useRepeating(section.title);
  return (
    <div className="space-y-4">
      <h2 className="font-geist text-base font-semibold text-neutral-900">
        {section.title}
      </h2>
      {fa.fields.map((item, index) => (
        <div key={item.id ?? index} className="rounded-md p-4" style={bg}>
          <div className="mb-4 flex items-center justify-between">
            <span className="font-geist text-sm font-medium text-neutral-900">
              {section.title}
            </span>
            <Button
              type="button"
              variant="ghost"
              className="text-red-700 hover:bg-neutral-200"
              onClick={() => fa.remove(index)}
            >
              <PolicyTrashIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {section.fields.map((f) => {
              const name = getFieldPath(section.title, index, f.name);
              const colSpan = f.fullWidth ? "md:col-span-2" : "";
              return (
                <div key={name} className={`space-y-1 ${colSpan}`}>
                  <Label className="font-geist text-sm font-medium text-neutral-900">
                    {f.label}
                  </Label>
                  <FieldRenderer field={f} name={name} />
                </div>
              );
            })}
          </div>
          {section.subsections?.map((sub) => (
            <div
              key={sub.title}
              className="mt-6 rounded-md border border-neutral-200 p-4"
              style={
                isBackground(sub) ? { backgroundColor: "#F8FAFC" } : undefined
              }
            >
              <h3 className="font-geist mb-3 text-sm font-medium text-neutral-900">
                {sub.title}
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {sub.fields.map((sf) => {
                  const name = getFieldPath(
                    section.title,
                    index,
                    sf.name,
                    sub.title,
                  );
                  const colSpan = sf.fullWidth ? "md:col-span-2" : "";
                  return (
                    <div key={name} className={`space-y-1 ${colSpan}`}>
                      <Label className="font-geist text-sm font-medium text-neutral-900">
                        {sf.label}
                      </Label>
                      <FieldRenderer field={sf} name={name} />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        className="font-geist w-full border-neutral-300 text-neutral-900"
        onClick={() => fa.append({})}
      >
        + {getAddLabel(section.title)}
      </Button>
    </div>
  );
}
