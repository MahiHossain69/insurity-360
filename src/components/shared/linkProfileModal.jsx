import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ClientData from "../../data/client";
import { useState } from "react";
import { toast } from "sonner";

const LinkProfileModal = ({ onClose, onConfirm, currentClientId }) => {
  const [selectedClientId, setSelectedClientId] = useState("");
  const [relation, setRelation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedClientId || !relation) {
      toast.error("Please select a client and enter a relation");
      return;
    }

    const selectedClient = ClientData.find(
      (c) => c.id.toString() === selectedClientId,
    );

    if (selectedClient) {
      onConfirm({
        id: selectedClient.id,
        name: selectedClient.name,
        relation,
        avatar: selectedClient.avatar,
      });
    }
  };

  return (
    <div className="authCardShadow flex max-w-[480px] flex-col gap-12 rounded-3xl bg-white p-12 md:p-16">
      <div>
        <h2 className="text-dark text-2xl font-bold">Link a Profile</h2>
        <p className="text-secondary600 mt-4 text-sm">
          Select a client from bellow and enter the relation with client
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Client</Label>
            <Select
              onValueChange={setSelectedClientId}
              value={selectedClientId}
            >
              <SelectTrigger className="w-full rounded-md border border-neutral-300 hover:ring-2 hover:ring-blue-500">
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent className="bg-white *:*:duration-300 *:*:hover:bg-neutral-500/16">
                {ClientData.filter(
                  (client) =>
                    client.id.toString() !== currentClientId?.toString(),
                ).map((client) => (
                  <SelectItem key={client.id} value={client.id.toString()}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={client.avatar} />
                        <AvatarFallback>{client.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>{client.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Relation</Label>
            <Input
              placeholder="Enter the relation with client"
              className="w-full rounded-md border border-neutral-300 hover:ring-2 hover:ring-blue-500"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-3">
          <Button
            type="submit"
            className="h-8 w-full rounded-md bg-blue-500 text-white duration-300 hover:bg-blue-700"
          >
            Save
          </Button>
          <Button
            type="button"
            onClick={onClose}
            className="group h-fit gap-2 bg-transparent !px-0 py-0 text-sm leading-none font-semibold text-neutral-900 shadow-none hover:bg-transparent"
          >
            <span className="relative">
              Cancel
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-neutral-900 duration-300 group-hover:w-full" />
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LinkProfileModal;
