import { useState } from 'react';
import { MapPin, Grid, List, ChevronRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CategoryIcon } from '../components/CategoryIcon';
import { ProductCard } from '../components/ProductCard';
import { User, Product } from '../App';
import { mockProducts } from '../utils/mockData';

interface HomeProps {
  navigate: (page: any, data?: any) => void;
  currentUser: User | null;
}

export function Home({ navigate, currentUser }: HomeProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'phones', label: 'Phones' },
    { id: 'laptops', label: 'Laptops' },
    { id: 'tv', label: 'TVs' },
    { id: 'fridge', label: 'Fridge' },
    { id: 'ac', label: 'AC' },
    { id: 'cameras', label: 'Cameras' },
    { id: 'audio', label: 'Audio' },
    { id: 'tablets', label: 'Tablets' },
  ];

  const premiumProducts = mockProducts.filter((p) => p.plan === 'premium');
  const featuredProducts = mockProducts.filter((p) => p.plan === 'featured');
  const nearbyProducts = mockProducts;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar navigate={navigate} currentUser={currentUser} />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl mb-4">Buy & Sell Used Electronics</h1>
            <p className="text-xl text-blue-100">Your trusted local marketplace</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-2 shadow-lg">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full px-4 py-3 text-gray-900 focus:outline-none rounded-lg"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        navigate('listing', { search: e.currentTarget.value });
                      }
                    }}
                  />
                </div>
                <select className="px-4 py-3 text-gray-900 border border-gray-200 rounded-lg focus:outline-none">
                  <option>All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>Near me</span>
                </button>
                <button
                  onClick={() => navigate('listing')}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl text-gray-900 mb-6">Browse Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <CategoryIcon
                key={category.id}
                category={category.id}
                label={category.label}
                onClick={() => navigate('listing', { category: category.id })}
              />
            ))}
          </div>
        </section>

        {/* Premium Listings */}
        {premiumProducts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-gray-900">Premium Listings</h2>
              <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                View all
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => navigate('detail', { product })}
                />
              ))}
            </div>
          </section>
        )}

        {/* Featured Listings */}
        {featuredProducts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-gray-900">Featured Items</h2>
              <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                View all
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => navigate('detail', { product })}
                />
              ))}
            </div>
          </section>
        )}

        {/* Nearby Items */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-gray-900">Nearby Items</h2>
              <p className="text-gray-600 text-sm">Products in your area</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'} gap-6`}>
            {nearbyProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => navigate('detail', { product })}
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl mb-4">Start Selling Today</h2>
          <p className="text-xl text-blue-100 mb-6">
            Post your electronics and reach thousands of buyers
          </p>
          <button
            onClick={() => (currentUser ? navigate('post') : navigate('login'))}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100"
          >
            Post Your Ad
          </button>
        </section>
      </div>

      <Footer />
    </div>
  );
}
