// client/src/app/page.js

import Link from 'next/link';
import Image from 'next/image';

// This is the main Server Component for the Homepage.
export default function HomePage() {
  // A high-quality, theme-matching background image for the hero section
  const heroBackgroundImage = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop';

  return (
    <main>
      {/* Hero Section with Background Image */}
      <section 
        className="relative bg-cover bg-center" 
        style={{ backgroundImage: `url(${heroBackgroundImage})` }}
      >
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="text-center pb-12 md:pb-16">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 text-white">
                Your Sanctuary for{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-300">
                  Wellness
                </span>
              </h1>
              <div className="max-w-3xl mx-auto">
                <p className="text-xl text-gray-200 mb-8">
                  Rediscover your balance and rejuvenate your spirit with our world-class spa services and holistic treatments.
                </p>
                <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div>
                    <Link
                      href="/services"
                      className="w-full inline-block text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-md px-8 py-3 shadow-lg"
                    >
                      Explore Our Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Featured Services</h2>
            <p className="text-lg text-gray-600 mt-4">Experience our most popular and transformative treatments.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 with Image */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="https://images.pexels.com/photos/3997992/pexels-photo-3997992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Deep Tissue Massage"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">Deep Tissue Massage</h3>
                <p className="text-gray-700">Relieve chronic muscle tension with our intensive deep tissue massage.</p>
              </div>
            </div>
            {/* Card 2 with Image */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="https://images.pexels.com/photos/5659019/pexels-photo-5659019.jpeg"
                  alt="Holistic facial treatment"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">Holistic Facial</h3>
                <p className="text-gray-700">Cleanse, exfoliate, and hydrate your skin with all-natural products.</p>
              </div>
            </div>
            {/* Card 3 with Image */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Yoga and meditation session"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">Yoga & Meditation</h3>
                <p className="text-gray-700">Find your inner peace and improve flexibility with our guided classes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
