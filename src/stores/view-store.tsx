import { NotImplemented } from "@/routes/process-manager/views/NotImplemented";
import { OrganizationDetails } from "@/routes/process-manager/views/organization";
import { Organizations } from "@/routes/process-manager/views/organizations";
import { makeAutoObservable } from "mobx";
import type { ReactNode } from "react";

export type View = "organization" | "organizations" | "contractors" | "clients";

export const viewMap: Record<View, ReactNode> = {
  organizations: <Organizations />,
  organization: <OrganizationDetails />,
  contractors: <NotImplemented />,
  clients: <NotImplemented />,
};

class ViewStore {
  view: View = "organizations";
  context: any = null;

  constructor() {
    makeAutoObservable(this);
  }

  switchView(view: View, context?: any) {
    this.view = view;
    this.context = context;
  }
}

export const viewStore = new ViewStore();
