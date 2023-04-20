import { Outlet } from "react-router-dom";
import { UserProvider } from "./contexts/Context";
import { ShopProvider } from "./contexts/ShopContext";

export function App() {
  return (
    <div>
      <UserProvider>
        <ShopProvider>
          <Outlet />
        </ShopProvider>
      </UserProvider>
    </div>
  );
}
