import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format Date to "DD MMM YYYY" (e.g., "13 Dec 2024")
export function formatDateToDDMMMYYYY(date) {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  const day = String(d.getDate()).padStart(2, "0");
  const monthStr = [
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
  ][d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${monthStr} ${year}`;
}

// Parse date string like "DD MMM YYYY" into Date
export function parseDateDDMMMYYYY(dateString) {
  if (!dateString || typeof dateString !== "string") return null;
  const parts = dateString.trim().split(" ");
  if (parts.length !== 3) {
    const d = new Date(dateString);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const [dayStr, monthStr, yearStr] = parts;
  const day = parseInt(dayStr, 10);
  const year = parseInt(yearStr, 10);
  const monthMap = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  const month = monthMap[monthStr];
  if (month === undefined || Number.isNaN(day) || Number.isNaN(year)) {
    return null;
  }
  const d = new Date(year, month, day);
  return Number.isNaN(d.getTime()) ? null : d;
}

// Parse time string like "hh:mm AM/PM" into hours/minutes
export function parseAmPmTime(timeString) {
  if (!timeString || typeof timeString !== "string") return null;
  const match = timeString.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
  return { hours, minutes };
}

export function slugify(input) {
  return String(input || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function generateFieldName(label, existing = []) {
  const base = slugify(label);
  let name = base || "field";
  let i = 1;
  const set = new Set(existing);
  while (set.has(name)) {
    name = `${base}_${i++}`;
  }
  return name;
}
