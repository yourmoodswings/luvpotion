import { useEffect, useState } from 'react';
import { getOrder } from '@/lib/storeApi';
import { useParams } from 'react-router-dom';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => { getOrder(id).then(setOrder).catch(()=>{}); }, [id]);
  if (!order) return <div className="p-10">Loading…</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order #{order.number}</h1>
      <ul className="divide-y">
        {order.items.map(it => (
          <li key={it.id} className="py-3 flex items-center gap-3">
            <img src={it.images?.[0]?.thumbnail || it.images?.[0]?.src} className="w-14 h-14 rounded object-cover" />
            <div className="flex-1">
              <div className="font-medium">{it.name}</div>
              <div className="text-sm">Qty {it.quantity}</div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: it.totals?.line_total }} />
          </li>
        ))}
      </ul>
      <div className="mt-6 text-right" dangerouslySetInnerHTML={{ __html: order.totals?.total }} />
    </div>
  );
}
