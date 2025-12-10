import { MapPin, Heart } from 'lucide-react';
import { Product } from '../App';
import { Badge } from './Badge';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer border ${
        product.plan === 'premium'
          ? 'border-blue-500 ring-2 ring-blue-100'
          : product.plan === 'featured'
          ? 'border-green-500'
          : 'border-gray-200'
      }`}
    >
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
          <Heart className="w-4 h-4 text-gray-700" />
        </button>
        {product.plan === 'premium' && (
          <div className="absolute top-2 left-2">
            <Badge type="premium" />
          </div>
        )}
        {product.plan === 'featured' && (
          <div className="absolute top-2 left-2">
            <Badge type="featured" />
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-gray-900 mb-1 line-clamp-2">{product.title}</h3>
        <div className="text-blue-600 mb-2">${product.price.toLocaleString()}</div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{product.location}</span>
            {product.distance && <span className="text-gray-400">• {product.distance}</span>}
          </div>
          <span className="px-2 py-1 bg-gray-100 rounded text-xs">{product.condition}</span>
        </div>

        <div className="mt-2 text-xs text-gray-500">{product.postedTime}</div>
      </div>
    </div>
  );
}
