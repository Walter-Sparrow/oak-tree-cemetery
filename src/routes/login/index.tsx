import { observer } from "mobx-react-lite";
import styles from "./login.module.scss";
import Logo from "@/assets/svg/logo.svg?react";
import { Card } from "@/components/card/Card";
import { Button } from "@/components/button/Button";
import { Input } from "@/components/input/Input";
import { useState } from "react";
import { useStore } from "@/stores/root-store";

export const Login = observer(() => {
  const { authStore } = useStore();

  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authStore.login(username);
  };

  return (
    <form className={styles.login} onSubmit={handleSubmit}>
      <Card className={styles.login__card}>
        <div className={styles.login__vendor}>
          <span className={styles.login__logo}>
            <Logo />
          </span>
          <span>Oak Tree Cemetery</span>
        </div>
        <Input
          ref={(ref) => ref?.focus()}
          placeholder="Enter your username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button variant="filled" type="submit" disabled={authStore.loading}>
          {authStore.loading ? "Signing in..." : "Sign in"}
        </Button>
        {authStore.error && (
          <p className={styles.login__error}>{authStore.error}</p>
        )}
      </Card>
    </form>
  );
});
