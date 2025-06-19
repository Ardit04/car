import React, { useEffect, useState } from 'react';
import { getCars } from '../api/carService';
import CommentForm from './CommentForm';
import AddToCartButton from './AddToCartButton';

const CarList = ({ user }) => {
  const [cars, setCars] = useState([]);
  const [filterModel, setFilterModel] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [filterFuel, setFilterFuel] = useState('');
  const [filterMileage, setFilterMileage] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const loadCars = async () => {
    const data = await getCars();
    setCars(data);
  };

  useEffect(() => {
    loadCars();
  }, []);

  useEffect(() => {
    if (cars.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % cars.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [cars]);

  const handleCommentAdded = (carId, comment) => {
    console.log(`New comment added for car ${carId}:`, comment);
  };

  const uniqueModels = [...new Set(cars.map((car) => car.model))];
  const uniqueBrands = [...new Set(cars.map((car) => car.brand))];
  const uniqueYears = [...new Set(cars.map((car) => car.year))].sort((a, b) => b - a);
  const uniqueFuels = [...new Set(cars.map((car) => car.fuel))];

  const priceRanges = [
    { label: 'All Prices', value: '' },
    { label: 'Under $10,000', value: '10000' },
    { label: 'Under $20,000', value: '20000' },
    { label: 'Under $30,000', value: '30000' },
    { label: 'Above $30,000', value: '30001' },
  ];

  const filteredCars = cars.filter((car) => {
    const matchesModel = filterModel ? car.model === filterModel : true;
    const matchesBrand = filterBrand ? car.brand === filterBrand : true;
    const matchesYear = filterYear ? String(car.year) === filterYear : true;
    const matchesPrice = filterPrice
      ? (filterPrice === '30001' ? car.price > 30000 : car.price <= parseInt(filterPrice))
      : true;
    const matchesFuel = filterFuel ? car.fuel === filterFuel : true;
    const matchesMileage = filterMileage ? car.mileage <= parseInt(filterMileage) : true;

    return (
      matchesModel &&
      matchesBrand &&
      matchesYear &&
      matchesPrice &&
      matchesFuel &&
      matchesMileage
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl text-center font-bold mb-6">The car of your dreams</h2>

      {/* Slider */}
      {cars.length > 0 && (
        <div className="w-full mb-10 flex flex-col items-center">
          {cars[currentSlide].image_url && (
            <img
              src={`http://localhost/car/backend/uploads/${cars[currentSlide].image_url}`}
              alt={`${cars[currentSlide].brand} ${cars[currentSlide].model}`}
              className="w-full max-h-[400px] object-contain rounded"
              loading="lazy"
            />
          )}
          <div className="mt-4 text-center">
            <h3 className="text-2xl md:text-3xl font-semibold">
              {cars[currentSlide].brand} {cars[currentSlide].model}
            </h3>
            <p className="text-gray-700 font-medium">
              {cars[currentSlide].year} - ${cars[currentSlide].price}
            </p>
            <p className="text-gray-500 text-sm">
              Fuel: {cars[currentSlide].fuel}, Mileage: {cars[currentSlide].mileage} km
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      {(!user || user?.role === 1) && (
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Brand */}
          <select
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            className="p-2 border border-gray-300 rounded shadow-sm"
          >
            <option value="">All Brands</option>
            {uniqueBrands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

          {/* Model */}
          <select
            value={filterModel}
            onChange={(e) => setFilterModel(e.target.value)}
            className="p-2 border border-gray-300 rounded shadow-sm"
          >
            <option value="">All Models</option>
            {uniqueModels.map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>

          {/* Year */}
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="p-2 border border-gray-300 rounded shadow-sm"
          >
            <option value="">All Years</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          {/* Price */}
          <select
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className="p-2 border border-gray-300 rounded shadow-sm"
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>

          {/* Fuel */}
          <select
            value={filterFuel}
            onChange={(e) => setFilterFuel(e.target.value)}
            className="p-2 border border-gray-300 rounded shadow-sm"
          >
            <option value="">All Fuel Types</option>
            {uniqueFuels.map((fuel) => (
              <option key={fuel} value={fuel}>{fuel}</option>
            ))}
          </select>

          {/* Mileage */}
          <input
            type="number"
            value={filterMileage}
            onChange={(e) => setFilterMileage(e.target.value)}
            placeholder="Max Mileage (km)"
            className="p-2 border border-gray-300 rounded shadow-sm"
          />
        </div>
      )}

      {/* Car Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCars.map((car) => (
          <div
            key={car.id}
            className="bg-white p-4 rounded shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300 flex flex-col items-center"
          >
            {car.image_url && (
              <div className="w-full aspect-video bg-gray-50 flex items-center justify-center overflow-hidden rounded mb-3">
                <img
                  src={`http://localhost/car/backend/uploads/${car.image_url}`}
                  alt={`${car.brand} ${car.model}`}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            )}

            <div className="w-full">
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-lg font-bold">
                  {car.brand} {car.model}
                </h4>

                {user?.role === 1 && (
                  <AddToCartButton
                    item={{ id: car.id, name: `${car.brand} ${car.model}`, price: car.price }}
                  />
                )}
              </div>

              <p className="text-gray-600">{car.year} - ${car.price}</p>
              <p className="text-gray-500 text-sm">Fuel: {car.fuel}, Mileage: {car.mileage} km</p>

              {car.description && (
                <p className="text-gray-500 text-sm mt-1 line-clamp-3">{car.description}</p>
              )}

              {user?.role === 1 && (
                <div className="mt-2">
                  <CommentForm
                    userId={user.id}
                    carId={car.id}
                    onCommentAdded={(comment) => handleCommentAdded(car.id, comment)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
