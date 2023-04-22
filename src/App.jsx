import { Outlet } from "react-router-dom";
import { UserProvider } from "./contexts/AuthContext";
import { ShopProvider } from "./contexts/ShopContext";
import { ProductProvider } from "./contexts/ProductContext";
import { Header } from "./components/Header";

export function App() {
  return (
    <div>
      <Header />
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
