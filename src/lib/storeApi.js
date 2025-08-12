import { WP_BASE } from './env';

let storeNonce = null;
async function ensureNonce() {
  if (storeNonce) return storeNonce;
  const res = await fetch(`${WP_BASE}/wp-json/luv/v1/nonce`, { credentials: 'include' });
  const json = await res.json();
  storeNonce = json.nonce;
  return storeNonce;
}

export async function storeFetch(path, opts = {}) {
  const nonce = await ensureNonce();
  const headers = {
    'Content-Type': 'application/json',
    'X-WC-Store-API-Nonce': nonce,
    ...(opts.headers || {}),
  };
  const res = await fetch(`${WP_BASE}${path}`, {
    credentials: 'include',
    ...opts,
    headers,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Products (for single product by slug)
export const getProductBySlug = (slug) =>
  storeFetch(`/wp-json/wc/store/v1/products?slug=${encodeURIComponent(slug)}&per_page=1`)
    .then(a => a[0]);

// Cart
export const getCart    = () => storeFetch('/wp-json/wc/store/v1/cart');
export const addItem    = (id, qty=1, variation=[]) =>
  storeFetch('/wp-json/wc/store/v1/cart/add-item', { method:'POST', body: JSON.stringify({ id, quantity: qty, variation }) });
export const updateItem = (key, qty) =>
  storeFetch('/wp-json/wc/store/v1/cart/update-item', { method:'POST', body: JSON.stringify({ key, quantity: qty }) });
export const removeItem = (key) =>
  storeFetch('/wp-json/wc/store/v1/cart/remove-item', { method:'POST', body: JSON.stringify({ key }) });

// Account / Orders (requires logged-in cookie)
export const listOrders = (page=1) => storeFetch(`/wp-json/wc/store/v1/account/orders?page=${page}`);
export const getOrder   = (id)     => storeFetch(`/wp-json/wc/store/v1/account/orders/${id}`);
