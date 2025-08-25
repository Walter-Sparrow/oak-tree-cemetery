import { createContext, useContext } from "react";
import { AuthStore } from "./auth-store";
import { OrganizationsStore } from "./organizations-store";

class RootStore {
  authStore: AuthStore;
  organizationsStore: OrganizationsStore;

  constructor() {
    this.authStore = new AuthStore();
    this.organizationsStore = new OrganizationsStore(this.authStore);
  }
}

const rootStore = new RootStore();

const StoreContext = createContext(rootStore);
export const useStore = () => useContext(StoreContext);
