import { useState } from 'react';
import { ArrowLeft, Send, Image, Smile, MoreVertical, AlertCircle } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { ChatBubble } from '../components/ChatBubble';
import { User, Product } from '../App';
import { mockUsers, mockProducts, mockChats } from '../utils/mockData';

interface ChatProps {
  navigate: (page: any, data?: any) => void;
  currentUser: User | null;
  selectedUserId?: string | null;
}

interface ChatConversation {
  userId: string;
  userName: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  productId?: string;
}

export function Chat({ navigate, currentUser, selectedUserId }: ChatProps) {
  const [activeChat, setActiveChat] = useState<string | null>(selectedUserId || null);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar navigate={navigate} currentUser={currentUser} />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-600 mb-4">Please login to access messages</p>
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

  // Mock conversations
  const conversations: ChatConversation[] = [
    {
      userId: '2',
      userName: 'Sarah Johnson',
      lastMessage: 'Sure! Can we meet this evening?',
      timestamp: '10:40 AM',
      unread: 2,
      online: true,
      productId: '1',
    },
    {
      userId: '3',
      userName: 'Mike Chen',
      lastMessage: 'Is the price negotiable?',
      timestamp: 'Yesterday',
      unread: 0,
      online: false,
      productId: '3',
    },
  ];

  const activeChatData = conversations.find((c) => c.userId === activeChat);
  const activeChatUser = mockUsers.find((u) => u.id === activeChat);
  const activeChatProduct = activeChatData?.productId
    ? mockProducts.find((p) => p.id === activeChatData.productId)
    : null;

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // In real app, would send to backend
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar navigate={navigate} currentUser={currentUser} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 180px)' }}>
          <div className="flex h-full">
            {/* Conversations List */}
            <div className={`w-full md:w-96 border-r border-gray-200 flex flex-col ${activeChat ? 'hidden md:flex' : 'flex'}`}>
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl text-gray-900">Messages</h2>
              </div>

              <div className="flex-1 overflow-y-auto">
                {conversations.map((conv) => {
                  const product = conv.productId ? mockProducts.find((p) => p.id === conv.productId) : null;
                  return (
                    <button
                      key={conv.userId}
                      onClick={() => setActiveChat(conv.userId)}
                      className={`w-full p-4 flex gap-3 hover:bg-gray-50 border-b border-gray-100 ${
                        activeChat === conv.userId ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                          {conv.userName.charAt(0)}
                        </div>
                        {conv.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>

                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-gray-900 truncate">{conv.userName}</p>
                          <span className="text-xs text-gray-500 flex-shrink-0">{conv.timestamp}</span>
                        </div>
                        {product && (
                          <p className="text-xs text-blue-600 truncate mb-1">{product.title}</p>
                        )}
                        <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                      </div>

                      {conv.unread > 0 && (
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-600 text-white text-xs rounded-full">
                            {conv.unread}
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chat Window */}
            {activeChat ? (
              <div className={`flex-1 flex flex-col ${activeChat ? 'flex' : 'hidden md:flex'}`}>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setActiveChat(null)} className="md:hidden">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      {activeChatUser?.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-gray-900">{activeChatUser?.name}</p>
                      {activeChatData?.online ? (
                        <p className="text-sm text-green-600">Online</p>
                      ) : (
                        <p className="text-sm text-gray-500">Offline</p>
                      )}
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Product Info Bubble */}
                {activeChatProduct && (
                  <div className="mx-4 mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
                    <img
                      src={activeChatProduct.images[0]}
                      alt={activeChatProduct.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">{activeChatProduct.title}</p>
                      <p className="text-sm text-blue-600">${activeChatProduct.price}</p>
                    </div>
                    <button
                      onClick={() => navigate('detail', { product: activeChatProduct })}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      View
                    </button>
                  </div>
                )}

                {/* Safety Alert */}
                <div className="mx-4 mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <strong>Safety Tip:</strong> Never share sensitive information like bank details, passwords, or
                    OTPs in chat.
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                  <ChatBubble
                    message="Hi, is this iPhone still available?"
                    isSent={false}
                    timestamp="10:30 AM"
                  />
                  <ChatBubble
                    message="Yes! It is available. Would you like to see it?"
                    isSent={true}
                    timestamp="10:35 AM"
                    isRead={true}
                  />
                  <ChatBubble
                    message="Sure! Can we meet this evening?"
                    isSent={false}
                    timestamp="10:40 AM"
                  />

                  {isTyping && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span>typing...</span>
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-end gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Image className="w-6 h-6 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Smile className="w-6 h-6 text-gray-600" />
                    </button>
                    <div className="flex-1">
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        placeholder="Type a message..."
                        rows={1}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex flex-1 items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
