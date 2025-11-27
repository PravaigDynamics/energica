import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Shop = () => {
  const products = [
    { id: 1, name: 'Racing Suit', price: 599, category: 'CORSA' },
    { id: 2, name: 'Helmet', price: 399, category: 'STRADA' },
    { id: 3, name: 'Gloves', price: 149, category: 'STILE' }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-200 mb-2">Shop</h1>
        <p className="text-zinc-400">Premium Energica merchandise and accessories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="aspect-square bg-zinc-800 rounded-lg mb-4"></div>
            <h3 className="text-lg font-bold text-zinc-200 mb-1">{product.name}</h3>
            <p className="text-sm text-zinc-400 mb-3">{product.category}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-lime-500">${product.price}</span>
              <button className="flex items-center gap-2 bg-lime-500 text-black px-4 py-2 rounded-lg hover:bg-lime-400 transition-colors">
                <ShoppingCart className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
