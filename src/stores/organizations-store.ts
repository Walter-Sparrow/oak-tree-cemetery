import { makeAutoObservable } from "mobx";
import type { AuthStore } from "./auth-store";

export interface Company {
  id: string;
  contactId: string;
  name: string;
  shortName: string;
  businessEntity: string;
  contract: {
    no: string;
    issue_date: string;
  };
  type: string[];
  status: string;
  photos: Photo[];
  createdAt: string;
  updatedAt: string;
}

export interface Photo {
  name: string;
  filepath: string;
  thumbpath: string;
  createdAt: string;
}

export class OrganizationsStore {
  authStore: AuthStore;
  organizations: Company[] = [];

  constructor(authStore: AuthStore) {
    this.authStore = authStore;
    makeAutoObservable(this);
  }

  async fetchCompamies() {}
}
