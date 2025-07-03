import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import bgImage from '../img/ds.jpeg';
import car1 from '../img/ae.jpg';
import car2 from '../img/aa.jpg';

// Animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Section = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

const AboutUs = () => {
  return (
    <div className="relative bg-gray-900 text-white py-20 px-6 lg:px-12 overflow-hidden">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 blur-sm"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className="relative max-w-6xl mx-auto z-10 space-y-20">
        {/* Title */}
        <Section>
          <h1 className="text-5xl font-extrabold text-center text-yellow-400 drop-shadow-md">
            Welcome to CarShop
          </h1>
        </Section>

        {/* Intro */}
        <Section delay={0.1}>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-200 leading-relaxed">
            At <span className="font-semibold text-yellow-400">CarShop</span>, we make car buying and selling easy, transparent, and exciting.
            With years of experience and a passion for excellence, we bring you hand-picked vehicles, reliable service, and a seamless digital experience.
          </p>
        </Section>

        {/* Gallery */}
        <Section delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {[car1, car2, bgImage].map((img, i) => (
              <motion.img
                key={i}
                src={img}
                alt={`Gallery ${i}`}
                className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
              />
            ))}
          </div>
        </Section>

        {/* Our Values */}
        <Section delay={0.1}>
          <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { title: 'Transparency', desc: 'Clear pricing, honest deals, and no hidden surprises—ever.' },
              { title: 'Quality', desc: 'Every car is inspected and verified to meet our strict standards.' },
              { title: 'Customer Care', desc: 'We’re here to guide you before, during, and after your purchase.' },
            ].map((val, i) => (
              <motion.div
                key={i}
                className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-2 text-yellow-300">{val.title}</h3>
                <p className="text-gray-300">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Meet the Team */}
        <Section delay={0.1}>
          <h2 className="text-3xl font-bold text-center mb-8 text-yellow-400">Meet Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {[
              { name: 'Ardit', role: 'Founder & Full Stack Developer' },
              { name: 'Erman', role: 'Sales Manager' },
              { name: 'You?', role: 'Join the team!' },
            ].map((person, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <img
                  src="https://via.placeholder.com/150"
                  alt={person.name}
                  className="rounded-full w-32 h-32 mx-auto mb-4 border-4 border-yellow-400"
                />
                <h4 className="text-xl font-semibold text-yellow-300">{person.name}</h4>
                <p className="text-gray-400 text-sm">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <Section delay={0.1}>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4 text-yellow-300">
              Ready to find your dream car?
            </h3>
            <a
              href="/car"
              className="inline-block bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition duration-300 shadow-md"
            >
              Browse Our Inventory
            </a>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default AboutUs;
