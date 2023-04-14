import { Outlet } from "react-router-dom";
import { UserProvider } from "./contexts/Context";

export function App() {
  return (
    <div>
      <UserProvider>
        <Outlet />
      </UserProvider>
    </div>
  );
}
