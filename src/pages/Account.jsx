import { useEffect, useState } from 'react';
import { listOrders } from '@/lib/storeApi';
import { Link } from 'react-router-dom';

export default function Account() {
  const [orders, setOrders] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    listOrders().then(setOrders).catch(e => setErr(e.message));
  }, []);

  if (err) return <div className="p-10">Please log in to view your orders.</div>;
  if (!orders) return <div className="p-10">Loading orders…</div>;
  if (orders.length === 0) return <div className="p-10">No orders yet.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <ul className="space-y-4">
        {orders.map(o => (
          <li key={o.id} className="p-4 rounded-xl border">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">#{o.number}</div>
                <div className="text-sm opacity-70">{new Date(o.date_created_gmt).toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold" dangerouslySetInnerHTML={{ __html: o.totals?.total }} />
                <div className="text-xs uppercase">{o.status}</div>
              </div>
            </div>
            <div className="mt-3">
              <Link to={`/orders/${o.id}`} className="underline">View details</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
