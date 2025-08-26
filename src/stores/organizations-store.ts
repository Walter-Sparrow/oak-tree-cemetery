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

  async fetchCompanies(abortSignal?: AbortSignal) {
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

  async renameOrganization(id: string, newName: string) {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const response = await fetch(`${API}/companies/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authStore.user?.token}`,
        },
        body: JSON.stringify({ name: newName }),
      });

      if (!response.ok) {
        throw new Error(`Rename error: ${response.status}`);
      }

      runInAction(() => {
        const index = this.organizations.findIndex((org) => org.id === id);
        if (index !== -1) {
          this.organizations[index] = {
            ...this.organizations[index],
            name: newName,
          };
        }
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async removeOrganization(id: string) {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const response = await fetch(`${API}/companies/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.authStore.user?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Delete error: ${response.status}`);
      }

      runInAction(() => {
        this.organizations = this.organizations.filter((org) => org.id !== id);
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async removeOrganizationImage(companyId: string, imageName: string) {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const response = await fetch(
        `${API}/companies/${companyId}/image/${imageName}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${this.authStore.user?.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Delete image error: ${response.status}`);
      }

      runInAction(() => {
        const company = this.organizations.find((org) => org.id === companyId);
        if (company) {
          company.photos = company.photos.filter(
            (photo) => photo.name !== imageName
          );
        }
      });
    } catch (err: any) {
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
