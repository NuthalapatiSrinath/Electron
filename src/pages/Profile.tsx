import { useState } from 'react';
import { Settings, Edit, TrendingUp, Package, DollarSign, Eye, LogOut } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { Badge } from '../components/Badge';
import { User, Product } from '../App';
import { mockProducts } from '../utils/mockData';

interface ProfileProps {
  navigate: (page: any, data?: any) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export function Profile({ navigate, currentUser, setCurrentUser }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'sold'>('active');

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar navigate={navigate} currentUser={currentUser} />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-600 mb-4">Please login to view your profile</p>
          <button
            onClick={() => navigate('login')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // Mock user listings
  const myListings = mockProducts.filter((p) => p.sellerId === currentUser.id);
  const activeListings = myListings;
  const soldListings: Product[] = [];

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('home');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar navigate={navigate} currentUser={currentUser} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl text-gray-900">{currentUser.name}</h1>
                  {currentUser.verified && <Badge type="verified" />}
                </div>
                <p className="text-gray-600">{currentUser.email}</p>
                <p className="text-gray-600">{currentUser.phone}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Settings className="w-5 h-5" />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Active Listings</p>
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl text-gray-900">{activeListings.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Total Views</p>
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl text-gray-900">1,247</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Items Sold</p>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl text-gray-900">{soldListings.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Total Earned</p>
              <DollarSign className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-3xl text-gray-900">$0</p>
          </div>
        </div>

        {/* Listings Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('active')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'active' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'
                }`}
              >
                Active ({activeListings.length})
              </button>
              <button
                onClick={() => setActiveTab('sold')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'sold' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'
                }`}
              >
                Sold ({soldListings.length})
              </button>
            </div>
            <button
              onClick={() => navigate('post')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Post New Ad
            </button>
          </div>

          {/* Active Listings */}
          {activeTab === 'active' && (
            <>
              {activeListings.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">You don&apos;t have any active listings</p>
                  <button
                    onClick={() => navigate('post')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Post Your First Ad
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeListings.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full sm:w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-gray-900 mb-1">{product.title}</h3>
                            <p className="text-blue-600 mb-1">${product.price.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">
                              {product.postedTime} • Views: 156
                            </p>
                          </div>
                          {product.plan !== 'free' && (
                            <Badge type={product.plan as 'premium' | 'featured'} />
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          <button
                            onClick={() => navigate('detail', { product })}
                            className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => navigate('pricing')}
                            className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 border border-green-600 rounded-lg hover:bg-green-50"
                          >
                            <TrendingUp className="w-4 h-4" />
                            Promote
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Sold Listings */}
          {activeTab === 'sold' && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No sold items yet</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
