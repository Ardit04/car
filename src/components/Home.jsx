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

  return (
    <div className="overflow-x-hidden bg-gray-100">
      {/* HERO SECTION */}
      <div
        className="w-full min-h-screen bg-cover bg-center flex flex-col justify-center items-center relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30"></div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-white font-extrabold text-4xl sm:text-5xl lg:text-6xl text-center max-w-4xl leading-tight"
        >
          Welcome to <span className="text-yellow-400">CarShop</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative z-10 mt-6 text-lg sm:text-xl text-gray-200 max-w-2xl text-center"
        >
          Your destination for premium vehicles and trusted service.
        </motion.p>
        <motion.a
          href="/car"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="relative z-10 mt-8 bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition duration-300 shadow-md"
        >
          Browse Our Cars
        </motion.a>
      </div>

      {/* LOGO SLIDER */}
        <div className="bg-black py-6 overflow-hidden relative">
          <div className="max-w-7xl mx-auto relative">
            <motion.div
              className="flex gap-10 items-center whitespace-nowrap"
              style={{ width: 'max-content' }}
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: 'linear',
              }}
            >
              {[...logos, ...logos].map((logo, index) => (
                <a href="/brands" key={index} className="inline-block">
                  <img
                    src={logo}
                    alt={`Brand ${index + 1}`}
                    className="h-12 sm:h-16 object-contain grayscale hover:grayscale-0 transition duration-300"
                    draggable={false}
                  />
                </a>
              ))}
            </motion.div>
          </div>
        </div>


      {/* FEATURED CARS SECTION */}
      <div className="py-20 bg-white px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Explore Our Featured Cars
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            From luxury sedans to powerful SUVs, discover the perfect ride tailored to your needs.
            All vehicles are inspected, certified, and ready for the road.
          </p>
        </motion.div>

        {/* CAR GALLERY */}
        <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
          {photos.map((photo, idx) => (
            <motion.img
              key={idx}
              src={photo}
              alt={`Car ${idx + 1}`}
              className="w-full sm:w-[48%] md:w-[31%] h-52 sm:h-60 md:h-72 object-cover rounded-xl shadow-md cursor-pointer hover:shadow-xl transition"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
            />
          ))}
        </div>

        {/* SEE ALL CTA */}
        <div className="text-center mt-12">
          <a
            href="/car"
            className="inline-block bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition duration-300 shadow-md"
          >
            See All Cars
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
