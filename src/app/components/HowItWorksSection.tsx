'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HowItWorksSection() {
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
              HOW IT WORKS
            </span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            Join our heritage preservation program in three simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Step 1 */}
          <motion.div
            className="flex flex-col items-center text-center lg:text-left lg:items-start"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                1
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-300 rounded-full"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Explore Programs</h3>
            <p className="text-gray-600 leading-relaxed max-w-sm">
              Browse through our diverse collection of traditional craft programs and find the perfect match for your interests and skills.
            </p>
          </motion.div>

          {/* Central Illustration */}
          <motion.div
            className="flex items-center justify-center order-first lg:order-none"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full blur-2xl opacity-40"></div>
              <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px]">
                <Image 
                  src="/batik-how.png" 
                  alt="How it works" 
                  fill 
                  className="object-contain drop-shadow-2xl" 
                />
              </div>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            className="flex flex-col items-center text-center lg:text-right lg:items-end"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                2
              </div>
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-300 rounded-full"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Apply & Get Reviewed</h3>
            <p className="text-gray-600 leading-relaxed max-w-sm">
              Submit your application with motivation and background. Our master artisans will carefully review each application to find passionate candidates.
            </p>
          </motion.div>
        </div>

        {/* Step 3 - Full width bottom */}
        <motion.div
          className="flex flex-col items-center text-center mt-16 pt-16 border-t border-orange-200"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl">
              3
            </div>
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-300 rounded-full"></div>
            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-yellow-300 rounded-full"></div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Start Learning & Creating</h3>
          <p className="text-gray-600 leading-relaxed max-w-2xl text-lg">
            Begin your journey with master artisans, learn traditional techniques, and contribute to preserving Indonesia's rich cultural heritage for future generations.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 