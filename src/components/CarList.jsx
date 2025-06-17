import React, { useEffect, useState } from 'react';
import { getCars } from '../api/carService';
import CommentForm from './CommentForm';
import AddToCartButton from './AddToCartButton';

const CarList = ({ user }) => {
  const [cars, setCars] = useState([]);
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



  // Otherwise, show regular user view with slider + grid cards
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
          </div>
        </div>
      )}

      {/* Car grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cars.map((car) => (
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
