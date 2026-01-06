"use client";

import { Button } from "@/components/ui/button";
import { leadAgentData } from "@/data/lead-agent";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import LeadAgentCard from "./leadAgentCard";

const LeadAgentCarousel = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="rounded-md border border-neutral-200">
      <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-2.5">
        <p className="text-base font-medium text-neutral-900">
          Lead-to-Close Ratio{" "}
        </p>
        <div className="flex gap-1 text-neutral-900">
          <Button
            ref={prevRef}
            className="group flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-md bg-neutral-500/8 !px-0 !py-0 text-neutral-900 shadow-none hover:bg-neutral-500/8"
          >
            <ChevronLeft className="!h-auto !w-6 transition-transform group-hover:-translate-x-1" />
          </Button>
          <Button
            ref={nextRef}
            className="group flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-md bg-neutral-500/8 !px-0 !py-0 text-neutral-900 shadow-none hover:bg-neutral-500/8"
          >
            <ChevronRight className="!h-auto !w-6 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
      <div className="flex py-5 pl-5">
        <Swiper
          modules={[Navigation]}
          spaceBetween={8}
          slidesOffsetAfter={100}
          slidesPerView="auto"
          loop
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="w-full"
        >
          {[...leadAgentData, ...leadAgentData].map((user, idx) => (
            <SwiperSlide
              key={`lead-agent-${user.name}-${user.id}-${idx}`}
              className="h-full w-full !max-w-[400px]"
            >
              <LeadAgentCard agent={user} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LeadAgentCarousel;
