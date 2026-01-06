import Image from "next/image";
import React from "react";
import RankIcon from "./rankIcon";

const TopAgentCard = ({ agent }) => {
  return (
    <div className="w-full pt-8">
      <div className="relative flex gap-2 rounded-md bg-neutral-50 p-4 md:gap-3 lg:gap-4">
        <div className="flex w-16 flex-col items-center pt-6">
          <Image
            src={agent.image}
            alt={agent.name}
            width={64}
            height={64}
            className="lef-4 absolute top-0 h-16 w-16 -translate-y-1/2 rounded-full object-cover"
          />

          {agent.rank === 1 && (
            <Image
              src="/icons/rank-1.svg"
              alt="Rank-1"
              width={47}
              height={48}
            />
          )}
          {agent.rank === 2 && (
            <Image
              src="/icons/rank-2.svg"
              alt="Rank-2"
              width={47}
              height={48}
            />
          )}
          {agent.rank === 3 && (
            <Image
              src="/icons/rank-3.svg"
              alt="Rank-3"
              width={47}
              height={48}
            />
          )}
          {agent.rank > 3 && <RankIcon key={agent.rank} rank={agent.rank} />}
          <div className="mt-3 text-center">
            <p className="text-xl leading-normal font-medium text-neutral-900">
              {agent.score}
            </p>
            <p className="text-sm leading-none text-neutral-500">Score</p>
          </div>
        </div>
        <div className="min-h-full w-px bg-neutral-100" />

        <div className="flex min-w-0 flex-1 flex-col">
          <p className="text-sm leading-normal font-medium text-neutral-900">
            {agent.name}
          </p>
          <p className="mt-1 truncate text-xs leading-normal text-neutral-500">
            {agent.designation} &nbsp;•&nbsp; {agent.phone} &nbsp;•&nbsp;{" "}
            {agent.email}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-1">
              <p className="text-xs leading-none text-neutral-900">
                Task Completed
              </p>
              <p className="text-xs leading-none font-semibold text-neutral-900">
                {agent.taskCompleted}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs leading-none text-neutral-900">
                Policies Handled
              </p>
              <p className="text-xs leading-none font-semibold text-neutral-900">
                {agent.policiesHandled}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs leading-none text-neutral-900">
                Claims Resolved
              </p>
              <p className="text-xs leading-none font-semibold text-neutral-900">
                {agent.claimsResolved}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopAgentCard;
