import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getCart, addItem, updateItem, removeItem } from '@/lib/storeApi';

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try { setCart(await getCart()); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const add = async (productId, qty=1, variation=[]) => { await addItem(productId, qty, variation); await refresh(); };
  const update = async (key, qty) => { await updateItem(key, qty); await refresh(); };
  const remove = async (key) => { await removeItem(key); await refresh(); };

  return (
    <CartCtx.Provider value={{ cart, loading, refresh, add, update, remove }}>
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => useContext(CartCtx);
