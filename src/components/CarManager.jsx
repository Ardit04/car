import React, { useState, useEffect } from 'react';
import CarForm from './CarForm';
import { getCars, deleteCar } from '../api/carService';

const CarManager = () => {
  const [cars, setCars] = useState([]);
  const [carToEdit, setCarToEdit] = useState(null);

  const loadCars = async () => {
    const data = await getCars();
    setCars(data);
  };

  useEffect(() => {
    loadCars();
  }, []);

  const handleEdit = (car) => {
    setCarToEdit(car); // kjo e aktivizon useEffect në CarForm
  };

  const handleDelete = async (id) => {
    await deleteCar(id);
    loadCars();
  };

  const handleSuccess = () => {
    setCarToEdit(null);
    loadCars(); // rifresko pas krijimit ose editimit
  };

  return (
    <div>
      <CarForm carToEdit={carToEdit} onSuccess={handleSuccess} />
      <h2>Car List</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.brand} {car.model} - {car.year} (${car.price})
            <button onClick={() => handleEdit(car)}>Edit</button>
            <button onClick={() => handleDelete(car.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarManager;
