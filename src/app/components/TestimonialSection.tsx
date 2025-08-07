"use client";
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const testimonials = [
  {
    name: 'Fauziah Hanum',
    text: 'Through this platform, I can share knowledge with the younger generation who are truly enthusiastic about preserving our cultural heritage.',
    avatar: '/default-avatar.png',
    role: 'Batik Artisan',
  },
  {
    name: 'Rizky Pratama',
    text: 'I gained hands-on experience directly from master artisans. It has been incredibly beneficial for my career and cultural understanding.',
    avatar: '/default-avatar.png',
    role: 'Art Student',
  },
  {
    name: 'Siti Nurhaliza',
    text: 'This platform made it easy for me to find cultural programs that match my interests. The process is simple and very engaging.',
    avatar: '/default-avatar.png',
    role: 'Heritage Enthusiast',
  },
  {
    name: 'Budi Santoso',
    text: 'As a craftsman, I can share my knowledge and help regenerate traditional skills to the younger generation.',
    avatar: '/default-avatar.png',
    role: 'Keris Master',
  },
];

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="w-full py-20 md:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full blur-xl opacity-50"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-200 rounded-full blur-xl opacity-50"></div>
      
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
              TESTIMONIALS
            </span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            Hear from our community of artisans and learners
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/90 backdrop-blur-lg rounded-full shadow-xl hover:bg-orange-50 hover:shadow-2xl active:scale-90 transition-all duration-200 border border-orange-200 group"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 text-orange-600 group-hover:text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/90 backdrop-blur-lg rounded-full shadow-xl hover:bg-orange-50 hover:shadow-2xl active:scale-90 transition-all duration-200 border border-orange-200 group"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6 text-orange-600 group-hover:text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Testimonial card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.1 }}
              className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center gap-6 min-h-[320px] border border-orange-100 relative mx-16"
            >
              {/* Quote decoration */}
              <div className="absolute top-6 left-6 text-6xl text-orange-200 font-serif">"</div>
              <div className="absolute bottom-6 right-6 text-6xl text-orange-200 font-serif rotate-180">"</div>
              
              {/* Avatar */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-orange-200 shadow-xl">
                  <img
                    src={testimonials[index].avatar}
                    alt={testimonials[index].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.div>

              {/* Content */}
              <div className="text-center">
                <h3 className="font-bold text-2xl text-gray-900 mb-2">{testimonials[index].name}</h3>
                <span className="inline-block bg-orange-100 text-orange-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
                  {testimonials[index].role}
                </span>
                <p className="text-gray-700 text-lg leading-relaxed max-w-2xl italic">
                  {testimonials[index].text}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  i === index 
                    ? 'bg-orange-500 scale-125' 
                    : 'bg-orange-200 hover:bg-orange-300'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 