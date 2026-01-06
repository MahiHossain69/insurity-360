import Image from "next/image";

const LeadAgentCard = ({ agent }) => {
  return (
    <div className="pt-8">
      <div className="relative rounded-md bg-neutral-50 px-4 pt-10 pb-4">
        <Image
          src={agent.image}
          alt={agent.name}
          width={64}
          height={64}
          className="absolute top-0 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover"
        />
        <div className="flex w-full flex-col items-center text-center">
          <p className="text-sm leading-normal font-medium text-neutral-900">
            {agent.name}
          </p>
          <p className="mt-1 text-xs leading-snug text-neutral-500">
            {agent.designation}
          </p>
          <p className="text-xs leading-snug text-neutral-500">{agent.phone}</p>
          <p className="text-xs leading-snug text-neutral-500">{agent.email}</p>
          <p className="mt-4 text-2xl leading-none font-semibold text-neutral-900">
            {agent.leadPercent}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadAgentCard;
