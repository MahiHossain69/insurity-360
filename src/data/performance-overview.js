import { ClockIcon, PhoneIcon, StarIcon } from "@/components/shared/svgs";

export const performanceOverviewData = [
  {
    id: "average-customer-satisfaction",
    title: "Average Customer Satisfaction",
    value: "4.7",
    icon: <StarIcon />,
    iconColor: "#DD7102",
    graphColor: "#FFD04A",
    bgColor: "#FFFAEB",
    timeframe: "35 Reviews this month",
  },
  {
    id: "average-response-time-to-new-leads",
    title: "Average Response Time to New Leads",
    value: "2.8 Hrs",
    icon: <ClockIcon />,
    iconColor: "#8D37EF",
    graphColor: "#8D37EF",
    bgColor: "#F9F5FF",
    incrementType: "decrease",
    percentage: "12.5",
    timeframe: "Than last week",
  },
  {
    id: "client-contact-frequency",
    title: "Client Contact Frequency",
    value: "1.8",
    subValue: "(Touchpoints/Client)",
    icon: <PhoneIcon />,
    iconColor: "#64748B",
    graphColor: "#64748B",
    bgColor: "#F1F5F9",
    incrementType: "decrease",
    percentage: "1.8",
    timeframe: "Than last Year",
  },
];
