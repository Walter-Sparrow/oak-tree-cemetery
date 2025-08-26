import type { Company } from "./stores/organizations-store";

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function formatCompanyType(type: Company["type"][number]) {
  if (type === "burial_care_contractor") return "Burial care Contractor";
  if (type === "funeral_home") return "Funeral Home";
  if (type === "logistics_services") return "Logistics services";
  return "Uknown type";
}
