import { API } from "@/constants";
import { makeAutoObservable, runInAction } from "mobx";

interface User {
  username: string;
  token: string;
}

export class AuthStore {
  user: User | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async login(username: string) {
    this.loading = true;
    this.error = null;

    try {
      const response = await fetch(
        `${API}/auth?user=${encodeURIComponent(username)}`
      );

      if (!response.ok) {
        throw new Error(`Auth error: ${response.status}`);
      }

      const token = response.headers
        .get("Authorization")
        ?.replace("Bearer ", "");

      if (!token) {
        throw new Error("Couldn't get the token");
      }

      runInAction(() => {
        this.user = { username, token };
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

  logout() {
    this.user = null;
    this.error = null;
  }
}
