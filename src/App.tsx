import { observer } from "mobx-react-lite";
import { Dashboard } from "./routes/dashboard";
import { Login } from "./routes/login";
import { useStore } from "./stores/root-store";

export const App = observer(() => {
  const { authStore } = useStore();

  return authStore.user ? <Dashboard /> : <Login />;
});
