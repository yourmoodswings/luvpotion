// Catalog requests use the public Store API; private WooCommerce keys must never enter browser bundles.
import { getProducts } from '@/lib/storeApi';
export default { get: async () => ({ data: await getProducts() }) };
