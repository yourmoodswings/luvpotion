import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auction from "./pages/Auction";
import Drops from "./pages/Drops";
import HeadsOfState from "./pages/HeadsOfState";
import Exhibitions from "./pages/Exhibitions";

// Pages we’ll use for shop
import Product from "./pages/Product";              // /drops/:slug
import Cart from "./pages/Cart";                    // /cart
import CheckoutRedirect from "./pages/CheckoutRedirect"; // /checkout
import Account from "./pages/Account";              // /account
import OrderDetails from "./pages/OrderDetails";    // /orders/:id

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auctions" element={<Auction />} />
      <Route path="/drops" element={<Drops />} />
      <Route path="/drops/:slug" element={<Product />} />
      <Route path="/exhibitions" element={<Exhibitions />} />
      <Route path="/exhibitions/heads-of-state" element={<HeadsOfState />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<CheckoutRedirect />} />
      <Route path="/account" element={<Account />} />
      <Route path="/orders/:id" element={<OrderDetails />} />
    </Routes>
  );
}
