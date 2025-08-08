'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const internships = [
    {
      title: 'Batik Tulis Pekalongan',
      location: 'Kabupaten Pekalongan',
      mentor: 'Fauziah Hanum',
      image: '/batik-side.png',
    },
    {
      title: 'Pelatihan Angklung',
      location: 'Bandung, Jawa Barat',
      mentor: 'Dewi Lestari',
      image: '/angklung.png',
    },
    {
      title: 'Workshop Wayang Kulit',
      location: 'Yogyakarta',
      mentor: 'Budi Santoso',
      image: '/wayang-hero.png',
    },
    {
      title: 'Kelas Membatik Modern',
      location: 'Solo, Jawa Tengah',
      mentor: 'Siti Nurhaliza',
      image: '/batik-side.png',
    },
    {
      title: 'Eksplorasi Gamelan',
      location: 'Surakarta',
      mentor: 'Rizky Pratama',
      image: '/gamelan-girls.png',
    },
    {
      title: 'Pengenalan Kerajinan Kayu',
      location: 'Jepara',
      mentor: 'Pak Slamet',
      image: '/default-program.png',
    },
  ];

export default function LatestInternshipSection() {
  return (
    <section className="w-full py-20 md:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-20 w-24 h-24 bg-orange-200 rounded-full blur-xl opacity-50"></div>
      <div className="absolute bottom-10 left-20 w-32 h-32 bg-yellow-200 rounded-full blur-xl opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              LATEST PROGRAMS
            </span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            Discover the newest opportunities to learn traditional Indonesian crafts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {internships.map((item, i) => (
            <motion.div
              key={i}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-orange-600 text-sm font-medium px-3 py-1 rounded-full">
                    Traditional Craft
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {item.location}
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Mentor: {item.mentor}
                  </div>
                </div>

                {/* Action button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Available Now</span>
                  <button className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium text-sm group-hover:translate-x-1 transition-all duration-200">
                    Learn More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link 
            href="/programs"
            className="inline-flex items-center bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            View All Programs
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 