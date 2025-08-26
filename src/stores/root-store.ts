import { createContext, useContext } from "react";
import { AuthStore } from "./auth-store";
import { OrganizationsStore } from "./organizations-store";
import { ViewStore } from "./view-store";

class RootStore {
  authStore: AuthStore;
  viewStore: ViewStore;
  organizationsStore: OrganizationsStore;

  constructor() {
    this.authStore = new AuthStore();
    this.viewStore = new ViewStore();
    this.organizationsStore = new OrganizationsStore(this.authStore);
  }
}

export const rootStore = new RootStore();

export const StoreContext = createContext(rootStore);
export const useStore = () => useContext(StoreContext);
