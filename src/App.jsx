import Admin from './admin/Admin';
import {ContentProvider,useContent} from './contexts/ContentContext';
import {useLocation} from 'react-router-dom';
import ManagedExhibition from './pages/ManagedExhibition';
import { Routes, Route } from 'react-router-dom';
import SiteLayout from '@/components/SiteLayout';
import Home from './pages/Home';
import Artists, { ArtistProfile } from './pages/Artists';
import ArtistStudio from './pages/ArtistStudio';
import MediaStudio from './pages/MediaStudio';
import Metavase from './pages/Metavase';
import Studio from './pages/Studio';
import Auction from './pages/Auction';
import Drops from './pages/Drops';
import HeadsOfState from './pages/HeadsOfState';
import Exhibitions from './pages/Exhibitions';
import Product from './pages/Product';
import Cart from './pages/Cart';
import CheckoutRedirect from './pages/CheckoutRedirect';
import Account from './pages/Account';
import OrderDetails from './pages/OrderDetails';
import { StatePanel } from '@/components/PageParts';
import './pages/Home.css';
import './world.css';
import './experience.css';
function Exhibition({slug,children}){const content=useContent();return content&&!content.exhibitions.some(e=>e.slug===slug)?<StatePanel title="Exhibition unavailable">This exhibition is not currently published.</StatePanel>:children;}
function PublicApp() { return <SiteLayout><Routes><Route path="/" element={<Home />} /><Route path="/auctions" element={<Auction />} /><Route path="/drops" element={<Drops />} /><Route path="/drops/:slug" element={<Product />} /><Route path="/exhibitions" element={<Exhibitions />} /><Route path="/exhibitions/:slug" element={<ManagedExhibition />} /><Route path="/exhibitions/metavase" element={<Exhibition slug="metavase"><Metavase /></Exhibition>} /><Route path="/artists" element={<Artists />} /><Route path="/artists/:id" element={<ArtistProfile />} />{import.meta.env.DEV && <Route path="/studio/artists" element={<ArtistStudio />} />}{import.meta.env.DEV && <Route path="/studio/media" element={<MediaStudio />} />}{import.meta.env.DEV && <Route path="/studio" element={<Studio />} />}<Route path="/exhibitions/heads-of-state" element={<Exhibition slug="heads-of-state"><HeadsOfState /></Exhibition>} /><Route path="/cart" element={<Cart />} /><Route path="/checkout" element={<CheckoutRedirect />} /><Route path="/account" element={<Account />} /><Route path="/orders/:id" element={<OrderDetails />} /><Route path="*" element={<StatePanel title="A little off the beaten path.">This page isn’t in our archive. Continue exploring below.</StatePanel>} /></Routes></SiteLayout>; }

export default function App(){const location=useLocation();return location.pathname==='/admin'?<Admin/>:<ContentProvider><PublicApp/></ContentProvider>;}
