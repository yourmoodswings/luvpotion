import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import wcApi from '@/utils/woocommerce';

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await wcApi.get(`/products?slug=${slug}`);
        if (res.data.length > 0) {
          setProduct(res.data[0]);
        }
      } catch (err) {
        console.error('Error loading product', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <div className="p-20 text-center">Loading…</div>;
  if (!product) return <div className="p-20 text-center">Product not found.</div>;

  return (
    <div className="bg-white text-black py-20 px-6 font-serif max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
        <p className="text-sm text-neutral-500">{product.categories[0]?.name}</p>
        <p className="text-lg text-neutral-700 mt-4" dangerouslySetInnerHTML={{ __html: product.price_html }} />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <img
            src={product.images[0]?.src}
            alt={product.name}
            className="w-full object-contain max-h-[600px]"
          />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="text-sm text-neutral-600" dangerouslySetInnerHTML={{ __html: product.description }} />

          <a
            href={`/cart/?add-to-cart=${product.id}`}
            className="w-fit mt-4 bg-black text-white px-6 py-2 text-sm rounded hover:bg-neutral-800"
          >
            Buy Now
          </a>
          <button className="w-fit text-sm underline hover:opacity-70">Add to Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
