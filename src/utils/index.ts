import type { EventStatus } from "../types";

export function getEventStatus(
  startDate: string,
  endDate: string,
): EventStatus {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now >= start && now <= end) return "live";
  if (now < start) return "upcoming";
  return "past";
}

export function isSessionLive(startTime: string, endTime: string): boolean {
  const now = new Date();
  return now >= new Date(startTime) && now <= new Date(endTime);
}

export const EXTERNAL_LINK_TYPES = [
  { id: "website", name: "Website" },
  { id: "github", name: "GitHub" },
  { id: "x", name: "Twitter / X" },
  { id: "linkedin", name: "LinkedIn" },
  { id: "facebook", name: "Facebook" },
  { id: "instagram", name: "Instagram" },
  { id: "other", name: "Other" },
] as const;

export function getExternalLinkIcon(type: string): string {
  const icons: Record<string, string> = {
    website: "Public",
    github: "Code",
    x: "AlternateEmail",
    linkedin: "Business",
    facebook: "Facebook",
    instagram: "Instagram",
    other: "Link",
  };
  return icons[type] || "Link";
}
