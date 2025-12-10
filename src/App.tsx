import { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { ProductListing } from './pages/ProductListing';
import { ProductDetail } from './pages/ProductDetail';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Chat } from './pages/Chat';
import { PostProduct } from './pages/PostProduct';
import { Profile } from './pages/Profile';
import { PricingPlans } from './pages/PricingPlans';

type Page = 'home' | 'listing' | 'detail' | 'login' | 'signup' | 'chat' | 'post' | 'profile' | 'pricing';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  verified: boolean;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: 'New' | 'Like New' | 'Used';
  description: string;
  images: string[];
  location: string;
  distance?: string;
  sellerId: string;
  postedTime: string;
  plan: 'free' | 'featured' | 'premium';
  brand?: string;
  model?: string;
  specifications?: Record<string, string>;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  productId?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedChatUser, setSelectedChatUser] = useState<string | null>(null);

  // Navigation helper
  const navigate = (page: Page, data?: any) => {
    if (page === 'detail' && data?.product) {
      setSelectedProduct(data.product);
    }
    if (page === 'listing' && data?.category) {
      setSelectedCategory(data.category);
    }
    if (page === 'listing' && data?.search) {
      setSearchQuery(data.search);
    }
    if (page === 'chat' && data?.userId) {
      setSelectedChatUser(data.userId);
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigate={navigate} currentUser={currentUser} />;
      case 'listing':
        return <ProductListing navigate={navigate} category={selectedCategory} searchQuery={searchQuery} currentUser={currentUser} />;
      case 'detail':
        return <ProductDetail navigate={navigate} product={selectedProduct} currentUser={currentUser} />;
      case 'login':
        return <Login navigate={navigate} setCurrentUser={setCurrentUser} />;
      case 'signup':
        return <Signup navigate={navigate} setCurrentUser={setCurrentUser} />;
      case 'chat':
        return <Chat navigate={navigate} currentUser={currentUser} selectedUserId={selectedChatUser} />;
      case 'post':
        return <PostProduct navigate={navigate} currentUser={currentUser} />;
      case 'profile':
        return <Profile navigate={navigate} currentUser={currentUser} setCurrentUser={setCurrentUser} />;
      case 'pricing':
        return <PricingPlans navigate={navigate} />;
      default:
        return <Home navigate={navigate} currentUser={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
    </div>
  );
}
