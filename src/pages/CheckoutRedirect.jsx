import { useEffect } from 'react';
import { WP_BASE } from '@/lib/env';

export default function CheckoutRedirect() {
  useEffect(() => {
    window.location.href = `${WP_BASE}/checkout/`;
  }, []);
  return <div className="p-10">Sending you to secure checkout…</div>;
}
