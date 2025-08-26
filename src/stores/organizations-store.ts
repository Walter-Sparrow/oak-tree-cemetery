import { makeAutoObservable, runInAction } from "mobx";
import type { AuthStore } from "./auth-store";
import { API } from "@/constants";

export interface Contact {
  id: string;
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  contactId: string;
  contact: Contact;
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
  loading = false;
  error: string | null = null;

  constructor(authStore: AuthStore) {
    this.authStore = authStore;
    makeAutoObservable(this);
  }

  async fetchCompamies(abortSignal?: AbortSignal) {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const response = await fetch(`${API}/companies/12`, {
        signal: abortSignal,
        headers: {
          Authorization: `Bearer ${this.authStore.user?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Fetch error: ${response.status}`);
      }

      const company = (await response.json()) as Company;

      const contactRespone = await fetch(
        `${API}/contacts/${company.contactId}`,
        {
          signal: abortSignal,
          headers: {
            Authorization: `Bearer ${this.authStore.user?.token}`,
          },
        }
      );

      if (!contactRespone.ok) {
        throw new Error(`Fetch contact error: ${contactRespone.status}`);
      }

      const contact = (await contactRespone.json()) as Contact;
      company.contact = contact;

      runInAction(() => {
        this.organizations = [company];
      });
    } catch (err: any) {
      if (err.name === "AbortError") {
        return;
      }

      runInAction(() => {
        this.error = err.message;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}
