"use client"

import { useState } from "react"
import { ArrowRight,  } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { thisMonthData, lastMonthData, customMonthData } from "@/data/leader-board"
import { CalendarIcon, RightIcon } from "@/components/shared/svgs"

function RankBadge({ rank }) {
  if (rank >= 1 && rank <= 7) {
    return (
      <div className="flex items-center -mt-10 justify-center w-9 h-9 sm:w-12 sm:h-12">
        <img src={`/icons/rank-${rank}.svg`} alt={`Rank ${rank}`} className="w-full h-full" />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center w-8 h-8 bg-[#e2e8f0] rounded-full">
      <span className="text-sm font-bold text-[#64748b]">{rank}</span>
    </div>
  )
}

export default function LeaderboardSideModal({ open = false, onClose = () => {} }) {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month")
  const [startDate, setStartDate] = useState(new Date(2025, 5, 1))
  const [endDate, setEndDate] = useState(new Date(2025, 5, 30))
  const [isStartDateOpen, setIsStartDateOpen] = useState(false)
  const [isEndDateOpen, setIsEndDateOpen] = useState(false)

  
  let leaderboardData
  switch (selectedPeriod) {
    case "last-month":
      leaderboardData = lastMonthData
      break
    case "custom":
      leaderboardData = customMonthData
      break
    default:
      leaderboardData = thisMonthData
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={`fixed bottom-0 left-0 h-full  sm:w-[640px] w-max border-l border-neutral-200 
        rounded-none p-0 bg-white overflow-hidden  transition-all duration-300 ease-in-out 
        data-[state=open]:translate-x-0 `}
      >
      
        <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-200">
          <DialogTitle className="text-lg font-bold text-neutral-900">Leaderboard</DialogTitle>
         
        </div>

       
        <div className="px-4  bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <Popover open={isStartDateOpen} onOpenChange={setIsStartDateOpen}>
              <PopoverTrigger asChild>
                <Button className="px-3 py-2 flex justify-between hover:bg-transparent w-full sm:w-70 border border-neutral-200 rounded-md bg-white text-left text-sm">
                  <span className="font-medium text-sm text-neutral-900">{format(startDate, "dd MMM yyyy")}</span>
                  <CalendarIcon className="h-4 w-4 text-neutral-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="p-4 border-neutral-500/8 bg-white">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => {
                    if (date) {
                      setStartDate(date)
                      setIsStartDateOpen(false)
                      setSelectedPeriod("custom")
                    }
                  }}
                />
              </PopoverContent>
            </Popover>

            <div className="sm:flex hidden sm:items-center sm:justify-center">
              <RightIcon className="text-neutral-500 w-9 h-9" />
            </div>

            <Popover open={isEndDateOpen} onOpenChange={setIsEndDateOpen}>
              <PopoverTrigger asChild>
                <Button className="px-3 py-2 flex justify-between hover:bg-transparent w-full sm:w-70 border border-neutral-200 rounded-md bg-white text-left text-sm">
                  <span className="font-medium text-neutral-900">{format(endDate, "dd MMM yyyy")}</span>
                  <CalendarIcon className="h-4 w-4 text-neutral-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="p-4 border-neutral-500/8 bg-white">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => {
                    if (date) {
                      setEndDate(date)
                      setIsEndDateOpen(false)
                      setSelectedPeriod("custom")
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

       
        <div className="h-auto w-full overflow-x-auto bg-neutral-50 p-1 sm:overflow-hidden">
          <div className="max-w-[600px] mx-auto">
            <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <TabsList className="flex min-w-max gap-1">
                {[
                  { value: "this-month", label: "This Month" },
                  { value: "last-month", label: "Last Month" },
                  { value: "custom", label: "Custom Date" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="font-geist rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap text-neutral-600 
                    data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

       
        <div className="max-h-[70vh] px-3 scrollbar-hide overflow-y-auto bg-white">
          {leaderboardData.map((person, index) => (
            <div
              key={`${person.rank}-${person.name}-${index}`}
              className={`flex  px-4 flex-row items-center gap-4 py-4 ${
                index !== leaderboardData.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              <RankBadge rank={person.rank} />

              <Avatar className="sm:w-10 sm:h-10 w-9 h-9 -mt-10">
                <AvatarImage src={person.image} alt={person.name} />
                <AvatarFallback>
                  {person.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 ">
                <h3 className="sm:text-base text-sm font-medium text-neutral-900">{person.name}</h3>
                <p className="text-xs tracking-wider text-neutral-500">
                  {person.role} • {person.phone} • {person.email}
                </p>

                <div className="flex gap-4 mt-2 text-xs">
                  <div>
                    <p className="text-neutral-900 text-xs">Tasks Completed</p>
                    <p className="font-semibold text-neutral-900">{person.tasksCompleted}</p>
                  </div>
                  <div>
                    <p className="text-neutral-900 text-xs">Policies Handled</p>
                    <p className="font-semibold text-neutral-900">{person.policiesHandled}</p>
                  </div>
                  <div>
                    <p className="text-neutral-900 text-xs">Claims Resolved</p>
                    <p className="font-semibold text-neutral-900">{person.claimsResolved}</p>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="sm:text-xl text-sm font-bold text-neutral-900">{person.score}</p>
                <p className="text-xs text-neutral-500">Score</p>
              </div>
            </div>
          ))}
        </div>

        
        <div className="px-4 py-3 flex justify-end bg-neutral-50">
          <Button
            variant="outline"
            onClick={onClose}
            size="sm"
            className="text-sm border border-neutral-300 font-semibold text-neutral-900"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
