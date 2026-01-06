import ClientProfile from "@/components/scenes/admin/client/clientList/clientProfile";
import PoliciesSummary from "@/components/scenes/admin/client/clientList/policysummary";
import ClientData from "@/data/client";
import { getIdFromUsername } from "@/utils/usernameGenerator";

const ClientListPage = async ({ params }) => {
  const { username } = await params;
  const clientId = getIdFromUsername(username);
  const client = ClientData.find((c) => c.id.toString() === clientId);

  if (!client) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <h2 className="text-xl font-semibold text-neutral-900">
          Client not found
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col 2xl:flex-row">
      <div className="">
        <ClientProfile clientData={client} />
      </div>
      <div className="w-full min-w-0">
        <PoliciesSummary clientName={client.name} />
      </div>
    </div>
  );
};

export default ClientListPage;
