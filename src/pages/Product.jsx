import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductBySlug } from '@/lib/storeApi';
import { useCart } from '@/contexts/CartContext';

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductBySlug(slug).then(setProduct).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="p-10">Loading product…</div>;
  if (!product) return <div className="p-10">Product not found.</div>;

  const img = product.images?.[0]?.src;

  const buyNow = async () => {
    await add(product.id, 1);
    navigate('/checkout');
  };

  const addToCart = async () => {
    await add(product.id, 1);
    navigate('/cart');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
      <div className="rounded-2xl overflow-hidden bg-neutral-100">
        {img && <img src={img} alt={product.name} className="w-full h-auto object-cover" />}
      </div>

      <div>
        <div className="text-xs uppercase tracking-widest text-neutral-500">
          {product.categories?.[0]?.name || 'Uncategorized'}
        </div>
        <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
        <div className="mt-2 text-lg" dangerouslySetInnerHTML={{ __html: product.prices?.price_html }} />

        <div className="mt-6 flex gap-3">
          <button onClick={buyNow}
            className="rounded-full px-6 py-3 bg-black text-white hover:opacity-90">Buy Now</button>
          <button onClick={addToCart}
            className="rounded-full px-6 py-3 border border-black hover:bg-black hover:text-white">Add to Cart</button>
        </div>

        <div className="prose mt-8" dangerouslySetInnerHTML={{ __html: product.description || '' }} />
      </div>
    </div>
  );
}
