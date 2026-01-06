"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import teamMemberData from "@/data/team-member";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { IoMdCheckmark } from "react-icons/io";

export default function AdditionalDetails({ onSubmit }) {
  const agents = useMemo(
    () => teamMemberData.filter((m) => m.role === "Broker").map((m) => m.name),
    [],
  );
  const producers = useMemo(
    () =>
      teamMemberData
        .filter((m) => ["Manager", "Broker", "Policy Admin"].includes(m.role))
        .map((m) => m.name),
    [],
  );

  const form = useFormContext();

  return (
    <>
      <div className="mb-12">
        <h1 className="mb-1 text-2xl font-semibold text-neutral-900">
          Additional Details
        </h1>
        <p className="text-sm text-neutral-500">
          Other optional notes or extra metadata.
        </p>
      </div>

      <div className="-mt-3 space-y-1" style={{ maxWidth: "800px" }}>
        <div>
          <Label htmlFor="additional-notes">Notes</Label>
          <FormField
            name="additionalNotes"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    id="additional-notes"
                    placeholder=""
                    className="mt-1.5 resize-none border-neutral-300 bg-white focus:border-neutral-300 focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="my-7 h-[1px] w-full bg-neutral-200"></div>
        <div className="flex flex-col gap-4">
          <div>
            <FormLabel className="text-sm font-medium text-neutral-900">
              Agent
            </FormLabel>
            <FormField
              name="agent"
              render={({ field }) => (
                <FormItem>
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="mt-1.5 h-9 w-full border-neutral-300 bg-white text-neutral-900 focus:border-neutral-300">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {agents.map((o) => (
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

          <div>
            <FormLabel className="text-sm font-medium text-neutral-900">
              Producer
            </FormLabel>
            <FormField
              name="producer"
              render={({ field }) => (
                <FormItem>
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="mt-1.5 h-9 w-full border-neutral-300 bg-white text-neutral-900 focus:border-neutral-300">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {producers.map((o) => (
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
        </div>

        <div className="my-7 h-[1px] w-full bg-neutral-200"></div>
        <div className="flex gap-4">
          <Button
            onClick={onSubmit}
            className="h-9 w-23 bg-blue-500 text-white hover:bg-blue-400"
          >
            <IoMdCheckmark className="h-4 w-4 text-white" />
            Save
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-none bg-transparent px-8 text-neutral-900 shadow-none"
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}
