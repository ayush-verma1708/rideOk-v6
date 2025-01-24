import { Instagram, Car, Calculator, Users, Clock, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Updates() {
    const navigate = useNavigate();

  const updates = [
    {
      date: 'March 14, 2024',
      title: 'Cost Validation Implementation',
      description: 'Added robust cost validation system to ensure fair pricing for all participants. The system now validates costs based on distance, fuel prices, and route overlaps.',
      icon: Calculator
    },
    {
      date: 'March 13, 2024',
      title: 'RideOK Launch',
      description: 'Launched RideOK - A smart carpooling solution that helps organize rides and calculate fair costs for everyone involved.',
      icon: Car
    }
  ];

  const highlights = [
    {
      title: 'Smart Cost Sharing',
      description: 'Automatically calculates and splits costs fairly based on distance and route overlap',
      icon: Calculator
    },
    {
      title: 'Route Optimization',
      description: 'Efficiently matches riders along similar routes to maximize savings',
      icon: Users
    },
    {
      title: 'Real-time Updates',
      description: 'Stay informed with instant notifications about your rides',
      icon: Clock
    },
    {
      title: 'Secure Platform',
      description: 'Verified users and secure payment system for peace of mind',
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
  <div className="max-w-5xl mx-auto px-4 py-6">
    {/* Main Header Section */}
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-900">RideOK Updates</h1>
      <a
        href="https://instagram.com/ride_ok"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
      >
        <Instagram className="w-5 h-5" />
        <span>Follow us on Instagram</span>
      </a>
    </div>

    {/* Divider for Separation */}
    <hr className="my-6 border-gray-200" />

    {/* Call-to-Action Section */}
    <div className="text-center">
      <h2 className="text-xl font-semibold text-gray-800">Start Your Carpooling Journey Today</h2>
      <p className="text-gray-600 mt-2">
        Join RideOK and experience smarter, more economical commuting
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-4 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Get Started
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  </div>
</header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Latest Updates Section */}
        <section className="mb-16">
              {/* Call to Action */}
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Updates</h2>
          <div className="space-y-8">
            {updates.map((update, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <update.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">{update.date}</span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-1">{update.title}</h3>
                    <p className="text-gray-600 mt-2">{update.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Application Highlights Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Application Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <highlight.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{highlight.title}</h3>
                    <p className="text-gray-600 mt-2">{highlight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      
      </main>
    </div>
  );
}

export default Updates;