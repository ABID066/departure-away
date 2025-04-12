

import GuiderCard from './components/guiders/GuiderCard';
import NewsletterSection from './components/home/NewsletterSection';


export default function Home() {


  const guides = [
    { name: 'John Smith', rating: '4.9', reviews: 120 },
    { name: 'Sarah Johnson', rating: '4.8', reviews: 98 },
    { name: 'Michael Brown', rating: '4.7', reviews: 85 },
    { name: 'Emily Davis', rating: '4.9', reviews: 110 },
    { name: 'John Smith', rating: '4.9', reviews: 120 },
    { name: 'Sarah Johnson', rating: '4.8', reviews: 98 },
    { name: 'Michael Brown', rating: '4.7', reviews: 85 },
    { name: 'Emily Davis', rating: '4.9', reviews: 110 }
  ];

  return (

    <main className="min-h-screen">








      {/* Top Rated Guides Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Top Rated Guider</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guides.map((guide, index) => (
              <GuiderCard key={index} guide={guide} />
            ))}
            <button className="bg-pink-700 text-white rounded-lg hover:bg-pink-900 transition-colors duration-300">
              View All Guider
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </main>
  );
}
