import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCars } from '../api/carService';
import CommentForm from './CommentForm';
import AddToCartButton from './AddToCartButton';

const sliderVariants = {
  enter: { opacity: 0, x: 50 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const CarList = ({ user }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterModel, setFilterModel] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [filterFuel, setFilterFuel] = useState('');
  const [filterMileage, setFilterMileage] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch cars
  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getCars();
      setCars(data);
      setLoading(false);
    })();
  }, []);

  // Slider auto change
  useEffect(() => {
    if (cars.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cars.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [cars]);

  // Unique filter options
  const uniqueModels = [...new Set(cars.map((c) => c.model))];
  const uniqueBrands = [...new Set(cars.map((c) => c.brand))];
  const uniqueYears = [...new Set(cars.map((c) => c.year))].sort((a, b) => b - a);
  const uniqueFuels = [...new Set(cars.map((c) => c.fuel))];
  const priceRanges = [
    { label: 'All Prices', value: '' },
    { label: 'Under $10,000', value: '10000' },
    { label: 'Under $20,000', value: '20000' },
    { label: 'Under $30,000', value: '30000' },
    { label: 'Above $30,000', value: '30001' },
  ];

  // Filter logic
  const filteredCars = cars.filter((car) => {
    if (filterModel && car.model !== filterModel) return false;
    if (filterBrand && car.brand !== filterBrand) return false;
    if (filterYear && String(car.year) !== filterYear) return false;
    if (filterPrice) {
      if (filterPrice === '30001' && car.price <= 30000) return false;
      if (filterPrice !== '30001' && car.price > parseInt(filterPrice)) return false;
    }
    if (filterFuel && car.fuel !== filterFuel) return false;
    if (filterMileage && car.mileage > parseInt(filterMileage)) return false;
    return true;
  });

  // Clear filters helper
  const clearFilters = () => {
    setFilterBrand('');
    setFilterModel('');
    setFilterYear('');
    setFilterPrice('');
    setFilterFuel('');
    setFilterMileage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-5xl font-extrabold text-center mb-14 text-gray-900">
        The Car of Your Dreams
      </h2>

      {/* Slider */}
      <div className="relative max-w-5xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-lg bg-white">
        <AnimatePresence mode="wait">
          {cars.length > 0 && (
            <motion.div
              key={cars[currentSlide].id}
              variants={sliderVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center p-8"
            >
              <div className="w-full h-72 sm:h-96 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden mb-6">
                <img
                  src={`http://localhost/car/backend/uploads/${cars[currentSlide].image_url}`}
                  alt={`${cars[currentSlide].brand} ${cars[currentSlide].model}`}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>

              <h3 className="text-4xl font-semibold text-gray-900">
                {cars[currentSlide].brand} {cars[currentSlide].model}
              </h3>
              <p className="text-lg text-gray-700 mt-1 font-medium">
                {cars[currentSlide].year} - ${cars[currentSlide].price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Fuel: {cars[currentSlide].fuel}, Mileage: {cars[currentSlide].mileage.toLocaleString()} km
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filters: sticky on top on scroll */}
      {(!user || user?.role === 1) && (
        <div className=" bg-white z-20 p-6 rounded-xl shadow-md mb-12 flex flex-wrap gap-5 justify-center">
          {[{
            label: 'Brand',
            value: filterBrand,
            onChange: setFilterBrand,
            options: uniqueBrands,
            placeholder: 'All Brands'
          },
          {
            label: 'Model',
            value: filterModel,
            onChange: setFilterModel,
            options: uniqueModels,
            placeholder: 'All Models'
          },
          {
            label: 'Year',
            value: filterYear,
            onChange: setFilterYear,
            options: uniqueYears,
            placeholder: 'All Years'
          },
          {
            label: 'Price',
            value: filterPrice,
            onChange: setFilterPrice,
            options: priceRanges.map(p => p.label),
            values: priceRanges.map(p => p.value),
            placeholder: ''
          },
          {
            label: 'Fuel',
            value: filterFuel,
            onChange: setFilterFuel,
            options: uniqueFuels,
            placeholder: 'All Fuel Types'
          }].map(({ label, value, onChange, options, placeholder, values }) => (
            <div key={label} className="flex flex-col min-w-[140px]">
              <label htmlFor={label.toLowerCase()} className="text-gray-600 font-semibold mb-1 select-none">
                {label}
              </label>
              <select
                id={label.toLowerCase()}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              >
                <option value="">{placeholder || `All ${label}s`}</option>
                {options.map((opt, idx) => (
                  <option key={opt} value={values ? values[idx] : opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <div className="flex flex-col min-w-[140px]">
            <label htmlFor="mileage" className="text-gray-600 font-semibold mb-1 select-none">
              Max Mileage (km)
            </label>
            <input
              id="mileage"
              type="number"
              value={filterMileage}
              onChange={(e) => setFilterMileage(e.target.value)}
              min={0}
              placeholder="Any"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>

          <button
            onClick={clearFilters}
            className="self-end px-5 py-3 bg-yellow-400 hover:bg-yellow-300 rounded-lg font-semibold shadow-md transition whitespace-nowrap"
            aria-label="Clear all filters"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Cars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        <AnimatePresence>
          {loading ? (
            [...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="h-80 bg-gray-200 rounded-xl animate-pulse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            ))
          ) : filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <motion.div
                key={car.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-[1.05] transition-transform duration-300 flex flex-col"
                aria-label={`${car.brand} ${car.model} car card`}
              >
                {car.image_url && (
                  <div className="aspect-[16/9] bg-gray-50 rounded-t-2xl overflow-hidden flex items-center justify-center">
                    <img
                      src={`http://localhost/car/backend/uploads/${car.image_url}`}
                      alt={`${car.brand} ${car.model}`}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xl font-bold text-gray-900">
                      {car.brand} {car.model}
                    </h4>

                    {user?.role === 1 && (
                      <AddToCartButton
                        item={{ id: car.id, name: `${car.brand} ${car.model}`, price: car.price }}
                      />
                    )}
                  </div>

                  <p className="text-gray-800 font-semibold mb-1">
                    {car.year} - ${car.price.toLocaleString()}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    Fuel: {car.fuel}, Mileage: {car.mileage.toLocaleString()} km
                  </p>

                  {car.description && (
                    <p className="text-gray-700 text-sm line-clamp-3 mb-4">{car.description}</p>
                  )}

                  {user?.role === 1 && (
                    <div className="mt-auto">
                      <CommentForm
                        userId={user.id}
                        carId={car.id}
                        onCommentAdded={(comment) => handleCommentAdded(car.id, comment)}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center text-gray-500 mt-24 text-lg"
            >
              Sorry, no cars match your criteria.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CarList;
