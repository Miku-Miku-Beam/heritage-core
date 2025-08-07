'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="w-full flex flex-col items-center py-20 md:py-32 justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full blur-xl opacity-60"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-200 rounded-full blur-xl opacity-60"></div>
      
      <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-16 w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Right: Illustration */}
        <motion.div
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full blur-3xl opacity-30"></div>
            <Image 
              src="/wayang-hero.png" 
              alt="Wayang Puppeteer" 
              fill 
              className="object-contain relative z-10 drop-shadow-2xl" 
              priority 
            />
          </div>
        </motion.div>
        
        {/* Left: Headline & CTA */}
        <motion.div
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left justify-center"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            🎭 Preserving Indonesian Heritage
          </motion.div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              JOIN AND BE<br />PART OF<br />
            </span>
            <span className="text-orange-600">CULTURAL HERITAGE</span>
          </h1>
          
          <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
            Be a bridge for the regeneration of Indonesia&apos;s cultural heritage by connecting traditional artisan masters with the younger generation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/programs"
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300"
            >
              Apply Now
            </Link>
            <Link
              href="/artisans"
              className="border-2 border-orange-300 hover:border-orange-400 text-orange-600 hover:text-orange-700 hover:bg-orange-50 font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300"
            >
              Meet Artisans
            </Link>
          </div>
          
          {/* Stats */}
          <motion.div 
            className="flex flex-wrap gap-8 mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div>
              <div className="text-3xl font-bold text-orange-600">50+</div>
              <div className="text-gray-600 text-sm">Master Artisans</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">100+</div>
              <div className="text-gray-600 text-sm">Active Programs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">1000+</div>
              <div className="text-gray-600 text-sm">Students Trained</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}