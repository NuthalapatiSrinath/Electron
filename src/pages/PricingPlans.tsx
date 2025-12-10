import { Check, Star, Zap, ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { User } from '../App';

interface PricingPlansProps {
  navigate: (page: any, data?: any) => void;
}

export function PricingPlans({ navigate }: PricingPlansProps) {
  const plans = [
    {
      name: 'Free',
      price: 0,
      icon: null,
      color: 'gray',
      description: 'Perfect for occasional sellers',
      features: [
        'Standard listing visibility',
        'Basic search placement',
        'Up to 5 photos',
        '30 days active listing',
        'Standard support',
        'Basic messaging',
      ],
      limitations: [
        'No priority placement',
        'Lower visibility',
      ],
    },
    {
      name: 'Featured',
      price: 9.99,
      icon: Zap,
      color: 'green',
      description: 'Great for regular sellers',
      popular: false,
      features: [
        'Everything in Free, plus:',
        'Category top placement',
        '3x more visibility',
        'Featured badge',
        'Up to 10 photos',
        '45 days active listing',
        'Priority support',
        'Highlighted in search',
      ],
    },
    {
      name: 'Premium',
      price: 19.99,
      icon: Star,
      color: 'blue',
      description: 'Best for serious sellers',
      popular: true,
      features: [
        'Everything in Featured, plus:',
        'Homepage spotlight',
        '10x more visibility',
        'Premium badge & highlighting',
        'Unlimited photos',
        '60 days active listing',
        '24/7 priority support',
        'Social media promotion',
        'Featured in emails',
        'Advanced analytics',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar navigate={navigate} currentUser={null} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate('home')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl text-gray-900 mb-4">Boost Your Listing Visibility</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose a plan that works best for you and reach more potential buyers
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-2xl shadow-lg p-8 relative ${
                plan.popular ? 'ring-2 ring-blue-600' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm rounded-full">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                {plan.icon && (
                  <div className={`inline-flex p-3 rounded-full mb-4 ${
                    plan.color === 'blue' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    <plan.icon className={`w-8 h-8 ${
                      plan.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                    }`} />
                  </div>
                )}
                <h3 className="text-2xl text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl text-gray-900">${plan.price}</span>
                  {plan.price > 0 && <span className="text-gray-600">/listing</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className={`w-5 h-5 flex-shrink-0 ${
                      plan.color === 'blue' ? 'text-blue-600' :
                      plan.color === 'green' ? 'text-green-600' :
                      'text-gray-400'
                    }`} />
                    <span className={`text-sm ${
                      feature.startsWith('Everything') ? 'font-semibold text-gray-900' : 'text-gray-700'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg transition-colors ${
                  plan.color === 'blue'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : plan.color === 'green'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'border-2 border-gray-300 text-gray-900 hover:bg-gray-50'
                }`}
              >
                {plan.price === 0 ? 'Get Started Free' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl text-gray-900 mb-6 text-center">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-gray-900">Feature</th>
                  <th className="text-center py-4 px-4 text-gray-900">Free</th>
                  <th className="text-center py-4 px-4 text-gray-900">Featured</th>
                  <th className="text-center py-4 px-4 text-gray-900">Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Listing Duration', free: '30 days', featured: '45 days', premium: '60 days' },
                  { name: 'Photo Uploads', free: '5', featured: '10', premium: 'Unlimited' },
                  { name: 'Visibility Boost', free: '1x', featured: '3x', premium: '10x' },
                  { name: 'Badge', free: '-', featured: 'Featured', premium: 'Premium' },
                  { name: 'Homepage Display', free: '-', featured: '-', premium: '✓' },
                  { name: 'Priority Support', free: '-', featured: '✓', premium: '24/7' },
                  { name: 'Analytics', free: 'Basic', featured: 'Standard', premium: 'Advanced' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-4 px-4 text-gray-700">{row.name}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{row.free}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{row.featured}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="text-gray-900 mb-2">How do paid plans increase visibility?</h3>
              <p className="text-gray-600">
                Paid plans place your listing higher in search results, featured categories, and the homepage. Premium
                listings also get highlighted styling and special badges that attract more buyer attention.
              </p>
            </div>
            <div>
              <h3 className="text-gray-900 mb-2">Can I upgrade my listing later?</h3>
              <p className="text-gray-600">
                Yes! You can upgrade your listing to Featured or Premium at any time from your profile dashboard. The
                remaining duration will be extended based on your new plan.
              </p>
            </div>
            <div>
              <h3 className="text-gray-900 mb-2">What happens after the listing expires?</h3>
              <p className="text-gray-600">
                After your listing duration ends, it will be automatically archived. You can renew it anytime by
                choosing a new plan or reposting for free.
              </p>
            </div>
            <div>
              <h3 className="text-gray-900 mb-2">Are there any refunds?</h3>
              <p className="text-gray-600">
                We offer a 7-day money-back guarantee if your listing hasn&apos;t received significant engagement. Contact
                our support team to process your refund.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
