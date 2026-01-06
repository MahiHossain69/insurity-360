import Image from "next/image";

const TrustedBy = ({ className }) => {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="relative flex">
        <Image
          src="/images/auth/trustedUser-1.webp"
          alt="Built by agents for agents."
          width={400}
          height={400}
          className="h-8 w-8 rounded-full border border-white object-cover"
        />
        <Image
          src="/images/auth/trustedUser-2.webp"
          alt="Built by agents for agents."
          width={400}
          height={400}
          className="-ml-3 h-8 w-8 rounded-full border border-white object-cover"
        />
        <Image
          src="/images/auth/trustedUser-3.webp"
          alt="Built by agents for agents."
          width={400}
          height={400}
          className="-ml-3 h-8 w-8 rounded-full border border-white object-cover"
        />
        <Image
          src="/images/auth/trustedUser-4.webp"
          alt="Built by agents for agents."
          width={400}
          height={400}
          className="-ml-3 h-8 w-8 rounded-full border border-white object-cover"
        />
      </div>

      <p className="text-dark text-base font-semibold">
        Built by agents for agents.
      </p>
    </div>
  );
};

export default TrustedBy;
