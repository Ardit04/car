import React from 'react';
import { motion } from 'framer-motion';
import bgImage from '../img/af.jpg';
import logo1 from '../img/audi.png';
import logo2 from '../img/renault.png';
import logo3 from '../img/nissan.png';
import logo4 from '../img/jeep.png';
import images1 from '../img/aa.jpg';
import images2 from '../img/aj.jpg';
import images3 from '../img/ac.jpg';

const Home = () => {
  const logos = [logo1, logo2, logo3, logo4];
  const photos = [images1, images2, images3];

  const testimonials = [
    {
      name: "Erion Krasniqi",
      feedback: "Amazing experience! I found my dream car at a great price and the process was smooth.",
    },
    {
      name: "Leonora Dauti",
      feedback: "Professional staff and top-quality cars. Highly recommend CarShop!",
    },
    {
      name: "Driton Hoxha",
      feedback: "I love how easy it is to explore and buy. Will come back for my second car soon!",
    },
  ];

  return (
    <div className="overflow-x-hidden bg-gray-50 font-sans">
      {/* HERO SECTION */}
      <div
        className="w-full min-h-screen bg-cover bg-center flex flex-col justify-center items-center relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-white font-black text-4xl sm:text-5xl lg:text-6xl text-center max-w-4xl leading-tight"
        >
          Discover Your Next <span className="text-yellow-400">Dream Car</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative z-10 mt-4 sm:mt-6 text-lg sm:text-xl text-gray-200 max-w-xl text-center"
        >
          Premium cars, certified quality, and unmatched customer service – all in one place.
        </motion.p>
        <motion.a
          href="/car"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="relative z-10 mt-8 bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition duration-300 shadow-lg"
        >
          Browse Our Cars
        </motion.a>
      </div>

      {/* LOGO SLIDER */}
      <div className="bg-black py-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex gap-12 items-center whitespace-nowrap"
            style={{ width: 'max-content' }}
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: 'linear',
            }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <a href="/brands" key={index}>
                <img
                  src={logo}
                  alt={`Brand ${index + 1}`}
                  className="h-14 sm:h-20 object-contain grayscale hover:grayscale-0 transition duration-300"
                  draggable={false}
                />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* FEATURED CARS */}
      <div className="py-20 px-4 sm:px-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
            Featured Vehicles
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Carefully selected and inspected cars that bring luxury and performance to your journey.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {photos.map((photo, idx) => (
            <motion.div
              key={idx}
              className="w-full sm:w-[48%] md:w-[30%] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
            >
              <img
                src={photo}
                alt={`Car ${idx + 1}`}
                className="w-full h-56 object-cover"
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a
            href="/car"
            className="inline-block bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition duration-300 shadow-md"
          >
            See All Cars
          </a>
        </div>
      </div>

      {/* TESTIMONIAL SECTION */}
      <div className="bg-gray-100 py-16 px-6">
        <motion.h2
          className="text-3xl font-bold text-center text-gray-800 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What Our Customers Say
        </motion.h2>
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <p className="text-gray-700 italic">"{t.feedback}"</p>
              <p className="mt-4 font-semibold text-gray-900">– {t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CONTACT CTA SECTION */}
      <div className="bg-yellow-400 py-16 px-6 text-center">
        <motion.h3
          className="text-3xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ready to find your perfect car?
        </motion.h3>
        <p className="text-gray-800 mb-6">
          Contact our team today and let us help you drive away happy.
        </p>
        <a
          href="/contact"
          className="inline-block bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default Home;
