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
    }, 2000);

    return () => clearInterval(interval);
  }, [cars]);

  const handleCommentAdded = (carId, comment) => {
    console.log(`New comment added for car ${carId}:`, comment);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Car List</h2>

      {/* SLIDER */}
      {cars.length > 0 && (
        <div className="relative w-full h-64 bg-gray-100 rounded-lg shadow mb-10 overflow-hidden">
          {cars[currentSlide].imageUrl && (
            <img
              src={`http://localhost/carshop/backend/${cars[currentSlide].imageUrl}`}
              alt={`${cars[currentSlide].brand} ${cars[currentSlide].model}`}
              className="w-full h-full object-cover absolute top-0 left-0 opacity-40"
            />
          )}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-black">
            <h3 className="text-2xl font-semibold">
              {cars[currentSlide].brand} {cars[currentSlide].model}
            </h3>
            <p className="text-gray-700 font-medium">
              {cars[currentSlide].year} - ${cars[currentSlide].price}
            </p>
            {cars[currentSlide].description && (
              <p className="text-sm mt-2 max-w-md px-2">{cars[currentSlide].description}</p>
            )}
          </div>
        </div>
      )}

      {/* CAR GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="bg-white p-4 rounded shadow flex flex-col">
            {car.imageUrl && (
              <img
                src={`http://localhost/carshop/backend/${car.imageUrl}`}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}

            <h4 className="text-lg font-bold mb-1">{car.brand} {car.model}</h4>
            <p className="text-gray-600">{car.year} - ${car.price}</p>
            {car.description && (
              <p className="text-gray-500 text-sm mt-1">{car.description}</p>
            )}

            {/* Order Button */}
            {user?.role === 1 && (
              <div className="mt-2">
                <AddToCartButton
                  item={{ id: car.id, name: `${car.brand} ${car.model}`, price: car.price }}
                />
              </div>
            )}

            {/* Comment Form */}
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
        ))}
      </div>
    </div>
  );
};

export default CarList;
