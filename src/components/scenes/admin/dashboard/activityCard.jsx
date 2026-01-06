import Image from "next/image";
import Link from "next/link";
import React from "react";

const ActivityCard = ({ user }) => {
  return (
    <div className="h-full w-full pt-8">
      <div className="relative h-full rounded-md bg-neutral-50 px-4 pt-10 pb-4">
        <Image
          src={user.image}
          alt={user.name}
          width={64}
          height={64}
          className="absolute top-0 left-4 aspect-square w-16 shrink-0 -translate-y-1/2 rounded-full object-cover"
        />

        <div className="">
          <p className="text-sm leading-normal font-medium text-neutral-900">
            {user.name}
          </p>

          <div className="mt-1 flex items-center gap-0.5">
            <div className="rounded-full bg-neutral-500/8 px-2 py-1 text-xs leading-none text-neutral-500">
              {user.userType}
            </div>
            <div className="flex items-center gap-1 rounded-full bg-teal-100 px-2 py-1 text-xs leading-none text-teal-700">
              <span className="aspect-square w-2 rounded-full bg-teal-500" />
              {user.status}
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <p className="text-sm leading-[1.1em] text-neutral-500">
              Policy Type:
            </p>
            <p className="text-sm leading-[1.1em] text-neutral-900">
              {user.policyType}
            </p>
          </div>

          <div className="mt-4 space-y-1">
            <p className="text-sm leading-[1.1em] text-neutral-500">Contact:</p>
            <div className="text-sm leading-[1.1em] text-neutral-900">
              <Link href={`mailto:${user.email}`}>{user.email}</Link> |{" "}
              <Link href={`tel:${user.phone}`}>{user.phone}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
