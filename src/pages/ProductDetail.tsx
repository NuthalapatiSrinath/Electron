import { useState } from 'react';
import { Phone, MessageCircle, Share2, Heart, Flag, MapPin, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Badge } from '../components/Badge';
import { ProductCard } from '../components/ProductCard';
import { User, Product } from '../App';
import { mockProducts, mockUsers } from '../utils/mockData';

interface ProductDetailProps {
  navigate: (page: any, data?: any) => void;
  product: Product | null;
  currentUser: User | null;
}

export function ProductDetail({ navigate, product, currentUser }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar navigate={navigate} currentUser={currentUser} />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-600 mb-4">Product not found</p>
          <button
            onClick={() => navigate('home')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const seller = mockUsers.find((u) => u.id === product.sellerId);
  const recommendedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleCallClick = () => {
    if (!currentUser) {
      navigate('login');
      return;
    }
    setShowPhoneNumber(true);
  };

  const handleChatClick = () => {
    if (!currentUser) {
      navigate('login');
      return;
    }
    navigate('chat', { userId: product.sellerId });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar navigate={navigate} currentUser={currentUser} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            {/* Image Carousel */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-4">
              <div className="relative aspect-video">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white rounded-full text-sm">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100">
                  <ZoomIn className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnail Strip */}
              {product.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        idx === currentImageIndex ? 'border-blue-600' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl text-gray-900">{product.title}</h1>
                    {product.plan === 'premium' && <Badge type="premium" />}
                    {product.plan === 'featured' && <Badge type="featured" />}
                  </div>
                  <div className="text-3xl text-blue-600 mb-2">${product.price.toLocaleString()}</div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="px-3 py-1 bg-gray-100 rounded-full">{product.condition}</span>
                    <span>{product.postedTime}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                    <Flag className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-gray-900 mb-2">Description</h3>
                <p className={`text-gray-700 ${!showFullDescription && 'line-clamp-3'}`}>
                  {product.description}
                </p>
                {product.description.length > 150 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-blue-600 text-sm mt-1"
                  >
                    {showFullDescription ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>

              {/* Specifications */}
              {product.specifications && (
                <div className="mb-6">
                  <h3 className="text-gray-900 mb-3">Specifications</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Category</span>
                      <span className="text-gray-900">{product.category}</span>
                    </div>
                    {product.brand && (
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Brand</span>
                        <span className="text-gray-900">{product.brand}</span>
                      </div>
                    )}
                    {product.model && (
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Model</span>
                        <span className="text-gray-900">{product.model}</span>
                      </div>
                    )}
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">{key}</span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location */}
              <div>
                <h3 className="text-gray-900 mb-3">Location</h3>
                <div className="flex items-center gap-2 text-gray-700 mb-3">
                  <MapPin className="w-5 h-5" />
                  <span>{product.location}</span>
                  {product.distance && <span className="text-gray-500">({product.distance} away)</span>}
                </div>
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>Map View</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Seller Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              {currentUser ? (
                <>
                  {seller && (
                    <>
                      <h3 className="text-gray-900 mb-4">Seller Information</h3>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                          {seller.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-gray-900">{seller.name}</p>
                            {seller.verified && <Badge type="verified" />}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-green-600">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            <span>Online now</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <button
                          onClick={handleCallClick}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          <Phone className="w-5 h-5" />
                          {showPhoneNumber ? seller.phone : 'Show Phone Number'}
                        </button>
                        <button
                          onClick={handleChatClick}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <MessageCircle className="w-5 h-5" />
                          Chat with Seller
                        </button>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Member since</span>
                          <span className="text-gray-900">Jan 2024</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total listings</span>
                          <span className="text-gray-900">12 active</span>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Login to view seller contact information</p>
                  <button
                    onClick={() => navigate('login')}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Login to Contact
                  </button>
                </div>
              )}

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Safety Tips:</strong>
                  <br />
                  • Meet in a public place
                  <br />
                  • Check the item before payment
                  <br />• Never send money in advance
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl text-gray-900 mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((p) => (
                <ProductCard key={p.id} product={p} onClick={() => navigate('detail', { product: p })} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile Sticky Bottom Bar */}
      {currentUser && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="flex gap-3">
            <button
              onClick={handleCallClick}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg"
            >
              <Phone className="w-5 h-5" />
              Call
            </button>
            <button
              onClick={handleChatClick}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Chat
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
