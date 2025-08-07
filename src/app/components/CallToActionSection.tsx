'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CallToActionSection() {
  return (
    <section className="w-full py-20 md:py-32 relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-orange-300 rounded-full blur-xl opacity-60"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-300 rounded-full blur-xl opacity-60"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-200 rounded-full blur-lg opacity-40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Main heading */}
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Ready to Be Part of
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Cultural Regeneration?
            </span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed">
            Join thousands of students preserving Indonesia's rich cultural heritage.
            <br className="hidden md:block" />
            Start your journey with traditional artisans today.
          </p>

          {/* Statistics */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Master Artisans</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">100+</div>
              <div className="text-gray-600 font-medium">Programs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">1000+</div>
              <div className="text-gray-600 font-medium">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">20+</div>
              <div className="text-gray-600 font-medium">Regions</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              href="/programs"
              className="group inline-flex items-center bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold px-10 py-5 rounded-2xl text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            >
              Start Learning Today
              <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            <Link 
              href="/programs"
              className="group inline-flex items-center bg-white hover:bg-gray-50 text-orange-600 font-bold px-10 py-5 rounded-2xl text-xl border-2 border-orange-200 hover:border-orange-300 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Browse Programs
              <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

          {/* Additional info */}
          <motion.p 
            className="text-gray-500 text-lg mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Join now and get your first lesson for free!
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
} 