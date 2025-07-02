import React, { useState, useEffect } from 'react';
import CarForm from './CarForm';
import { getCars, deleteCar } from '../api/carService';

const CarManager = () => {
  const [cars, setCars] = useState([]);
  const [carToEdit, setCarToEdit] = useState(null);

  const loadCars = async () => {
    try {
      const data = await getCars();
      setCars(data);
    } catch (error) {
      console.error('Failed to load cars:', error);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  const handleEdit = (car) => {
    setCarToEdit(car);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await deleteCar(id);
        loadCars();
      } catch (error) {
        console.error('Failed to delete car:', error);
      }
    }
  };

  const handleSuccess = () => {
    setCarToEdit(null);
    loadCars();
  };

  return (
    <div className="p-4">
      <CarForm carToEdit={carToEdit} onSuccess={handleSuccess} />
      <h2 className="text-xl font-bold mt-6 mb-4">Car List</h2>

      {/* Responsive table wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700 text-left">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-sm">Image</th>
              <th className="px-4 py-2 text-sm">Brand</th>
              <th className="px-4 py-2 text-sm">Model</th>
              <th className="px-4 py-2 text-sm">Year</th>
              <th className="px-4 py-2 text-sm">Price</th>
              <th className="px-4 py-2 text-sm">Fuel</th>
              <th className="px-4 py-2 text-sm">Mileage</th>
              <th className="px-4 py-2 text-sm">Description</th>
              <th className="px-4 py-2 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700 text-gray-300">
            {cars.map((car) => (
              <tr key={car.id} className="text-center text-sm">
                <td className="border px-2 py-2">
                  {car.image_url ? (
                    <img
                      src={`http://localhost/car/backend/uploads/${car.image_url}`}
                      alt={`${car.brand} ${car.model}`}
                      className="w-20 h-14 object-contain mx-auto rounded"
                      loading="lazy"
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td className="border px-2 py-2">{car.brand}</td>
                <td className="border px-2 py-2">{car.model}</td>
                <td className="border px-2 py-2">{car.year}</td>
                <td className="border px-2 py-2">${car.price}</td>
                <td className="border px-2 py-2">{car.fuel}</td>
                <td className="border px-2 py-2">{car.mileage} km</td>
                <td className="border px-2 py-2 truncate max-w-xs">{car.description || 'N/A'}</td>
                <td className="border px-2 py-2 space-y-1 md:space-x-2 md:space-y-0 flex flex-col md:flex-row justify-center items-center">
                  <button
                    onClick={() => handleEdit(car)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(car.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarManager;
