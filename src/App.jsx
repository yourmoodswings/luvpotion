import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auction from "./pages/Auction";
import Drops from "./pages/Drops";
import HeadsOfState from "./pages/HeadsOfState";
import Account from "./pages/Account";
import Exhibitions from "./pages/Exhibitions";
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auctions" element={<Auction />} />
          <Route path="/drops" element={<Drops />} />
          <Route path="/exhibitions" element={<Exhibitions />} />
          <Route path="/exhibitions/heads-of-state" element={<HeadsOfState />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
