import React from 'react';
import bgImage from '../img/af.jpg';
import logo1 from '../img/audi.png';
import logo2 from '../img/renault.png';
import logo3 from '../img/nissan.png';
import logo4 from '../img/jeep.png';
import images1 from '../img/aa.jpg';
import images2 from '../img/aj.jpg';
import images3 from '../img/ac.jpg';

const Home = () => {
  const logos = [logo1, logo2, logo3, logo4, logo1, logo2];
  const photos = [images1, images2, images3];

  return (
    <div className="overflow-x-hidden">
      {/* 1. Background + titulli */}
      <div
        className="w-full min-h-screen bg-cover bg-center flex flex-col justify-center items-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <h1 className="text-white font-bold text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-3xl leading-tight">
          Welcome!
        </h1>
      </div>

      {/* 2. Shirit me logot */}
      <div className="bg-black py-6 px-4">
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
          <h2 className="text-white text-lg sm:text-xl font-semibold flex-shrink-0 whitespace-nowrap">
            Some of our brands
          </h2>
          <div className="flex gap-8">
            {logos.map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`Logo ${index + 1}`}
                className="h-10 sm:h-14 object-contain"
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. Galeria me foto */}
      <div className="bg-white py-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-6">
          {photos.map((photo, idx) => (
            <img
              key={idx}
              src={photo}
              alt={`Foto ${idx + 1}`}
              className="w-full sm:w-[48%] md:w-[31%] h-48 sm:h-60 md:h-72 object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
