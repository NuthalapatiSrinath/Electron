import { User, MessageCircle, Heart, PlusCircle, Menu, Search } from 'lucide-react';
import { User as UserType } from '../App';

interface NavbarProps {
  navigate: (page: any, data?: any) => void;
  currentUser: UserType | null;
  onSearch?: (query: string) => void;
}

export function Navbar({ navigate, currentUser, onSearch }: NavbarProps) {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    if (onSearch) {
      onSearch(query);
    } else {
      navigate('listing', { search: query });
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('home')}>
            <div className="bg-blue-600 rounded-lg p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="white" />
              </svg>
            </div>
            <span className="ml-2 text-blue-600">TechMarket</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="search"
                placeholder="Search electronics..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {currentUser ? (
              <>
                <button
                  onClick={() => navigate('post')}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <PlusCircle className="w-5 h-5" />
                  Post Ad
                </button>
                <button
                  onClick={() => navigate('chat')}
                  className="p-2 hover:bg-gray-100 rounded-lg relative"
                >
                  <MessageCircle className="w-6 h-6 text-gray-700" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                  <Heart className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={() => navigate('profile')}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('login')}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('signup')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="search"
              placeholder="Search electronics..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
        </div>
      </div>
    </nav>
  );
}
