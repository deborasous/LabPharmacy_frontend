import { Outlet } from "react-router-dom";
import { UserProvider } from "./contexts/Context";
import { ShopProvider } from "./contexts/ShopContext";
import { ProductProvider } from "./contexts/ProductContext";

export function App() {
  return (
    <div>
      <UserProvider>
        <ShopProvider>
          <ProductProvider>
            <Outlet />
          </ProductProvider>
        </ShopProvider>
      </UserProvider>
    </div>
  );
}
