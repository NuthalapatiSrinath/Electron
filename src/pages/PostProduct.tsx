import { useState } from 'react';
import { ArrowLeft, Upload, X, MapPin, Check } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { User } from '../App';

interface PostProductProps {
  navigate: (page: any, data?: any) => void;
  currentUser: User | null;
}

export function PostProduct({ navigate, currentUser }: PostProductProps) {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'featured' | 'premium'>('free');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar navigate={navigate} currentUser={currentUser} />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-600 mb-4">Please login to post a product</p>
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

  const categories = ['Phones', 'Laptops', 'TVs', 'Fridge', 'AC', 'Cameras', 'Audio', 'Tablets'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Mock image upload - in real app would upload to server
    const mockImages = [
      'https://images.unsplash.com/photo-1761906976176-0559a6d130dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9kZXJufGVufDF8fHx8MTc2NTA5NDcxMXww&ixlib=rb-4.1.0&q=80&w=1080',
    ];
    setImages([...images, ...mockImages]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setPublishSuccess(true);
      setTimeout(() => {
        navigate('profile');
      }, 2000);
    }, 2000);
  };

  if (publishSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar navigate={navigate} currentUser={currentUser} />
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl text-gray-900 mb-2">Product Published!</h2>
            <p className="text-gray-600 mb-6">Your product is now live and visible to buyers</p>
            <button
              onClick={() => navigate('profile')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              View My Listings
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isPublishing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar navigate={navigate} currentUser={currentUser} />
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl text-gray-900 mb-2">Publishing Your Ad...</h2>
            <p className="text-gray-600">Please wait while we process your listing</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar navigate={navigate} currentUser={currentUser} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate('home')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s}
                </div>
                {s < 4 && <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`}></div>}
              </div>
            ))}
          </div>

          {/* Step 1: Upload Images */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl text-gray-900 mb-2">Upload Photos</h2>
              <p className="text-gray-600 mb-6">Add 3-10 photos of your product</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                    <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {images.length < 10 && (
                  <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 flex flex-col items-center justify-center cursor-pointer bg-gray-50">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Upload Photo</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={images.length === 0}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Product Information */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl text-gray-900 mb-2">Product Details</h2>
              <p className="text-gray-600 mb-6">Tell buyers about your product</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. iPhone 14 Pro Max 256GB"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Condition *</label>
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Condition</option>
                      <option value="New">New</option>
                      <option value="Like New">Like New</option>
                      <option value="Used">Used</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Price ($) *</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your product in detail..."
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!title || !category || !condition || !price || !description}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl text-gray-900 mb-2">Location</h2>
              <p className="text-gray-600 mb-6">Where is your product located?</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Location *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City, State"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                  <MapPin className="w-5 h-5 inline mr-2" />
                  Use Current Location
                </button>

                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>Map Preview</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(2)} className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!location}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Choose Plan */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl text-gray-900 mb-2">Choose Visibility Plan</h2>
              <p className="text-gray-600 mb-6">Increase your ad&apos;s visibility to reach more buyers</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Free Plan */}
                <button
                  onClick={() => setSelectedPlan('free')}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    selectedPlan === 'free' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl text-gray-900">Free</h3>
                    {selectedPlan === 'free' && <Check className="w-6 h-6 text-blue-600" />}
                  </div>
                  <div className="text-3xl text-gray-900 mb-4">$0</div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Standard listing</li>
                    <li>• Basic visibility</li>
                    <li>• 30 days active</li>
                  </ul>
                </button>

                {/* Featured Plan */}
                <button
                  onClick={() => setSelectedPlan('featured')}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    selectedPlan === 'featured'
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl text-gray-900">Featured</h3>
                    {selectedPlan === 'featured' && <Check className="w-6 h-6 text-green-600" />}
                  </div>
                  <div className="text-3xl text-gray-900 mb-4">$9.99</div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Category top placement</li>
                    <li>• 3x more visibility</li>
                    <li>• Featured badge</li>
                    <li>• 45 days active</li>
                  </ul>
                </button>

                {/* Premium Plan */}
                <button
                  onClick={() => setSelectedPlan('premium')}
                  className={`p-6 rounded-xl border-2 text-left transition-all relative ${
                    selectedPlan === 'premium'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="absolute -top-3 right-4 px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                    Recommended
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl text-gray-900">Premium</h3>
                    {selectedPlan === 'premium' && <Check className="w-6 h-6 text-blue-600" />}
                  </div>
                  <div className="text-3xl text-gray-900 mb-4">$19.99</div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Homepage spotlight</li>
                    <li>• 10x more visibility</li>
                    <li>• Premium badge</li>
                    <li>• Highlighting</li>
                    <li>• 60 days active</li>
                  </ul>
                </button>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(3)} className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Back
                </button>
                <button
                  onClick={handlePublish}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Publish Listing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
