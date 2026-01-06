"use client";

import { SlashIcon } from "@/components/shared/svgs";
import React, { useState, useEffect, useRef } from "react";

const SalesPerformanceCard = ({ item }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const cardRef = useRef(null);

  // Calculate percentage for leads card
  const leadsPercentage = item.data.assigned
    ? Math.round((item.data.contacted / item.data.assigned) * 100)
    : 0;

  // Calculate percentage for follow-ups card
  const followUpsPercentage = item.data.total
    ? Math.round((item.data.completed / item.data.total) * 100)
    : 0;

  // Get target percentage
  const targetPercentage =
    item.data.percentage !== undefined
      ? item.data.percentage
      : item.data.completed !== undefined
        ? followUpsPercentage
        : leadsPercentage;

  // Intersection Observer for viewport detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the component is visible
        rootMargin: "0px 0px -50px 0px", // Start animation slightly before fully visible
      },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isVisible]);

  // Animation logic
  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500; // 1.5 seconds
    const steps = 120; // 120 FPS
    const stepDuration = duration / steps;
    let currentStep = 0;

    const animate = () => {
      currentStep++;
      const progress = Math.min(currentStep / steps, 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      const currentPercentage = Math.round(targetPercentage * easeOutCubic);
      const currentProgress = targetPercentage * easeOutCubic;

      setAnimatedPercentage(currentPercentage);
      setAnimatedProgress(currentProgress);

      if (progress < 1) {
        setTimeout(animate, stepDuration);
      }
    };

    animate();
  }, [isVisible, targetPercentage]);

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center justify-between gap-4 rounded-md p-4 min-[1600px]:!flex-row md:flex-row xl:flex-col"
      style={{
        background: item.bgColor,
      }}
    >
      <div className="flex h-full w-full flex-col items-center justify-between gap-4 md:items-start">
        <div
          className={`flex h-full flex-col justify-between gap-8 ${item.data.contacted === undefined && item.data.completed === undefined ? "justify-center" : ""}`}
        >
          <p className="text-dark text-base font-medium">{item.title}</p>

          {/* Leads Contacted vs Assigned */}
          {item.data.contacted !== undefined &&
            item.data.assigned !== undefined && (
              <div className="flex gap-4">
                <div>
                  <p className="text-dark text-[32px] leading-[0.65em]">
                    {item.data.contacted}
                  </p>
                  <p className="text-dark mt-4 text-base">Contacted</p>
                </div>

                <div className="relative">
                  <SlashIcon className="text-dark h-full" />
                </div>

                <div>
                  <p className="text-dark text-[32px] leading-[0.65em]">
                    {item.data.assigned}
                  </p>
                  <p className="text-dark mt-4 text-base">Assigned</p>
                </div>
              </div>
            )}

          {/* Follow-ups Completed On Time */}
          {item.data.completed !== undefined &&
            item.data.total !== undefined && (
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <p className="text-dark text-[32px] leading-[0.65em]">
                    {item.data.completed}{" "}
                    <span className="text-base leading-normal font-normal">
                      of
                    </span>{" "}
                    {item.data.total}
                  </p>
                </div>
                <p className="text-sm text-neutral-500">{item.subTitle}</p>
              </div>
            )}
        </div>

        {/* Percentage display */}
      </div>
      <div className="relative flex w-full max-w-72 grow items-end justify-center">
        {/* Recharts-style Semicircular Progress */}
        <div className="relative h-[132px] w-full max-w-[264px] overflow-hidden">
          <svg
            className="absolute bottom-0 left-1/2 h-full w-full -translate-x-1/2"
            width="264"
            height="132"
            viewBox="0 0 264 132"
          >
            {/* Background arc (white) */}
            <path
              d="M 16 132 A 116 116 0 0 1 248 132"
              fill="none"
              stroke="white"
              strokeWidth="16"
              strokeLinecap="square"
            />
            {/* Progress arc (colored) */}
            <path
              d="M 16 132 A 116 116 0 0 1 248 132"
              fill="none"
              stroke={item.progressColor}
              strokeWidth="16"
              strokeLinecap="square"
              strokeDasharray={`${(animatedProgress / 100) * 364} 364`}
              style={{
                transition: isVisible
                  ? "none"
                  : "stroke-dasharray 0.3s ease-in-out",
              }}
            />
          </svg>
        </div>

        {/* Percentage text */}
        <span className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 text-[32px] leading-none font-semibold text-neutral-500">
          {animatedPercentage}%
        </span>
      </div>
    </div>
  );
};

export default SalesPerformanceCard;
