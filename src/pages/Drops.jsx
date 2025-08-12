import React, { useEffect, useState } from 'react';
import wcApi from '@/utils/woocommerce';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

const DropsPage = () => {
  const [products, setProducts] = useState([]);
  const [addingId, setAddingId] = useState(null);
  const navigate = useNavigate();
  const { add } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await wcApi.get('/products?per_page=20&status=publish');
        setProducts(res.data || []);
      } catch (err) {
        console.error('Failed to fetch Woo products:', err);
      }
    };
    fetchProducts();
  }, []);

  const buyNow = async (id) => {
    try { setAddingId(id); await add(id, 1); navigate('/checkout'); }
    finally { setAddingId(null); }
  };

  const addToCart = async (id) => {
    try { setAddingId(id); await add(id, 1); navigate('/cart'); }
    finally { setAddingId(null); }
  };

  return (
    <div className="bg-white text-black py-24 px-6 font-serif">
      <div className="max-w-5xl mx-auto text-center mb-20">
        <h1 className="text-6xl font-bold">Drops</h1>
        <p className="text-sm mt-4 italic text-neutral-600 max-w-xl mx-auto">
          A curated collection of pendants, medallions, and heirlooms honoring legacy through design.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24 max-w-7xl mx-auto">
        {products.map((p) => (
          <article key={p.id} className="flex flex-col items-center text-center">
            <div className="text-xs uppercase tracking-wide text-neutral-500 mb-2">
              {p.categories?.[0]?.name || 'Uncategorized'}
            </div>

            <Link to={`/drops/${p.slug}`} className="block w-full max-w-xs rounded-2xl overflow-hidden bg-neutral-100">
              {p.images?.[0]?.src ? (
                <img src={p.images[0].src} alt={p.name} className="w-full h-auto object-contain" loading="lazy" />
              ) : (
                <div className="aspect-square flex items-center justify-center text-neutral-400">No image</div>
              )}
            </Link>

            <h2 className="text-lg font-medium mt-4 mb-1">{p.name}</h2>
            <p className="text-sm text-neutral-600 mb-2" dangerouslySetInnerHTML={{ __html: p.price_html }} />

            <div className="flex gap-2 mt-4 text-xs">
              <button
                onClick={() => buyNow(p.id)}
                disabled={addingId === p.id}
                className="bg-black text-white px-3 py-1 rounded hover:bg-neutral-800 transition disabled:opacity-50"
              >
                {addingId === p.id ? 'Adding…' : 'Buy Now'}
              </button>

              <button
                onClick={() => addToCart(p.id)}
                disabled={addingId === p.id}
                className="border border-black px-3 py-1 rounded hover:bg-black hover:text-white transition disabled:opacity-50"
              >
                {addingId === p.id ? 'Adding…' : 'Add to Cart'}
              </button>

              <Link to={`/drops/${p.slug}`} className="underline text-black hover:opacity-70 px-2">
                View
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default DropsPage;
