import insuranceTypes from "@/data/insurance_types.json";

// Monthly Premium Collection Data
export const monthlyPremiumData = {
  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  premiums: [
    710630, 843084, 1068093, 1063868, 508866, 920450, 850320, 780940, 950670,
    1120580, 890340, 760890,
  ],
};

// Top 5 Policy Categories Data
export const policyCategories = [
  {
    category: "Health",
    amount: 710630,
    percentage: 17,
  },
  {
    category: "Auto",
    amount: 843084,
    percentage: 20,
  },
  {
    category: "Life",
    amount: 1068093,
    percentage: 26,
  },
  {
    category: "Travel",
    amount: 508866,
    percentage: 12,
  },
  {
    category: "Student",
    amount: 1063868,
    percentage: 25,
  },
];

// Claims Status Overview Data
export const claimsStatusData = [
  {
    status: "Total Filed",
    count: 670,
  },
  {
    status: "Under Review",
    count: 650,
  },
  {
    status: "Approved",
    count: 620,
  },
  {
    status: "Denied",
    count: 560,
  },
  {
    status: "Paid (Closed)",
    count: 521,
  },
];


export const policyTypes = Array.from(
  new Set(insuranceTypes.map((item) => item.insuranceType)),
);