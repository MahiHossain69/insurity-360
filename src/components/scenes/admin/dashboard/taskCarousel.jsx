"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { tasksData } from "@/data/tasks";
import { useAuth } from "@/hooks/use-auth";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TaskCard from "./taskCard";

const TaskCarousel = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [showMyTasksOnly, setShowMyTasksOnly] = useState(false);
  const { user } = useAuth();

  // Filter tasks based on the toggle state
  const filteredTasks = showMyTasksOnly
    ? tasksData.filter((task) => task.assignedTo.name === user.name)
    : tasksData;

  return (
    <div className="rounded-md border border-neutral-200">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-neutral-100 px-5 py-2.5 sm:flex-row sm:items-center">
        <div className="flex gap-2.5 md:gap-5">
          <p className="text-base font-medium text-neutral-900">
            Tasks Due Soon
          </p>
          <div className="flex min-h-full w-px bg-neutral-200" />

          <div className="flex items-center space-x-3">
            <label className="relative ml-4 inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                id="showMyTasksOnly"
                checked={showMyTasksOnly}
                onChange={(e) => setShowMyTasksOnly(e.target.checked)}
                className="peer sr-only"
              />
              <div className="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-500 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            </label>
            <Label
              htmlFor="showMyTasksOnly"
              className="cursor-pointer text-sm font-medium text-neutral-900"
            >
              Show my tasks only
            </Label>
          </div>
        </div>
        <div className="ml-auto flex gap-1 text-neutral-900 sm:m-0">
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
        {filteredTasks.length === 0 ? (
          <div className="flex w-full items-center justify-center py-12">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                <svg
                  className="h-8 w-8 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium text-neutral-900">
                {showMyTasksOnly
                  ? "No tasks assigned to you"
                  : "No tasks available"}
              </h3>
              <p className="text-sm text-neutral-500">
                {showMyTasksOnly
                  ? "You don't have any tasks assigned at the moment."
                  : "There are no tasks to display right now."}
              </p>
            </div>
          </div>
        ) : (
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
            {[...filteredTasks, ...filteredTasks].map((task, index) => (
              <SwiperSlide
                key={index}
                className="h-full min-h-60 w-full max-w-[490px] grow"
              >
                <TaskCard item={task} fullHeight={true} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default TaskCarousel;
