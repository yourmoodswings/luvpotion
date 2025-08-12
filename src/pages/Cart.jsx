import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { cart, loading, update, remove } = useCart();

  if (loading) return <div className="p-10">Loading cart…</div>;
  if (!cart || cart.items_count === 0)
    return <div className="p-10 text-center">Your cart is empty.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cart</h1>

      <ul className="divide-y">
        {cart.items.map(item => (
          <li key={item.key} className="py-4 flex gap-4 items-center">
            <img src={item.images?.[0]?.thumbnail || item.images?.[0]?.src} alt=""
                 className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm" dangerouslySetInnerHTML={{ __html: item.prices?.price }} />
              <div className="mt-2 flex items-center gap-2">
                <button className="px-2 py-1 border"
                        onClick={() => update(item.key, Math.max(1, item.quantity - 1))}>−</button>
                <span>{item.quantity}</span>
                <button className="px-2 py-1 border"
                        onClick={() => update(item.key, item.quantity + 1)}>+</button>
                <button className="ml-4 text-red-600" onClick={() => remove(item.key)}>Remove</button>
              </div>
            </div>
            <div className="font-semibold" dangerouslySetInnerHTML={{ __html: item.totals?.line_total }} />
          </li>
        ))}
      </ul>

      <div className="mt-6 p-4 rounded-2xl bg-neutral-50">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span dangerouslySetInnerHTML={{ __html: cart.totals.total_items }} />
        </div>
        <div className="flex justify-between">
          <span>Shipping & Taxes</span>
          <span className="opacity-60">Calculated at checkout</span>
        </div>
      </div>

      <div className="mt-6 text-right">
        <a href="/checkout"
           className="inline-flex items-center rounded-full px-6 py-3 border border-black hover:bg-black hover:text-white transition">
          Checkout
        </a>
      </div>
    </div>
  );
}
