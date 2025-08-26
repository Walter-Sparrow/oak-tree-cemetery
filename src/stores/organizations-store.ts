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

export const BusinessEntity = {
  SoleProprietorship: "Sole Proprietorship",
  Partnership: "Partnership",
  LimitedLiabilityCompany: "Limited Liability Company",
} as const;

export const CompanyType = {
  FuneralHome: "funeral_home",
  LogisticsServices: "logistics_services",
  BurialCareContractor: "burial_care_contractor",
} as const;

export interface Company {
  id: string;
  contactId: string;
  contact: Contact;
  name: string;
  shortName: string;
  businessEntity: (typeof BusinessEntity)[keyof typeof BusinessEntity];
  contract: {
    no: string;
    issue_date: string;
  };
  type: (typeof CompanyType)[keyof typeof CompanyType][];
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

  async uploadOrganizationImage(companyId: string, file: File) {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API}/companies/${companyId}/image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.authStore.user?.token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload image error: ${response.status}`);
      }

      const newPhoto = (await response.json()) as Photo;

      runInAction(() => {
        const company = this.organizations.find((org) => org.id === companyId);
        if (company) {
          company.photos.push(newPhoto);
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

  async updateOrganization(
    updatedCompany: Partial<Company> & Pick<Company, "id">
  ) {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const response = await fetch(`${API}/companies/${updatedCompany.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authStore.user?.token}`,
        },
        body: JSON.stringify({
          name: updatedCompany.name,
          shortName: updatedCompany.shortName,
          businessEntity: updatedCompany.businessEntity,
          contract: updatedCompany.contract,
          type: updatedCompany.type,
        }),
      });

      if (!response.ok) {
        throw new Error(`Update company error: ${response.status}`);
      }

      const partialUpdate = (await response.json()) as Company;

      runInAction(() => {
        const company = this.organizations.find(
          (o) => o.id === updatedCompany.id
        );
        if (company) {
          Object.assign(company, partialUpdate);
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
