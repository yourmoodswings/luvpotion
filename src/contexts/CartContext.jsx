import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getCart, addItem, updateItem, removeItem } from '@/lib/storeApi';
const CartCtx = createContext(null);
export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const refresh = useCallback(async () => {
    setLoading(true); setError('');
    try { const next = await getCart(); setCart(next); return next; }
    catch { setError('We could not read your saved bag. Check your browser storage and try again.'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { refresh(); const sync = () => refresh(); window.addEventListener('storage', sync); return () => window.removeEventListener('storage', sync); }, [refresh]);
  const mutate = async fn => {
    setError('');
    try { if (!cart) await getCart(); const next = await fn(); setCart(next); }
    catch (error) { throw error; }
  };
  return <CartCtx.Provider value={{ cart, loading, error, refresh, add: (id, quantity=1, variation=[]) => mutate(() => addItem(id,quantity,variation)), update: (key,quantity) => mutate(() => updateItem(key,quantity)), remove: key => mutate(() => removeItem(key)) }}>{children}</CartCtx.Provider>;
}
export const useCart = () => useContext(CartCtx);
