import React, { useState, useEffect } from 'react';
import { createCar, updateCar } from '../api/carService';

const initialForm = {
  id: '',
  brand: '',
  model: '',
  year: '',
  price: '',
  fuel: '',
  mileage: '',
  description: '',
  image: null,
};


const CarForm = ({ carToEdit, onSuccess }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (carToEdit) {
      setForm({
        id: carToEdit.id,
        brand: carToEdit.brand || '',
        model: carToEdit.model || '',
        year: carToEdit.year || '',
        price: carToEdit.price || '',
        fuel: carToEdit.fuel || '',
        mileage: carToEdit.mileage || '',
        description: carToEdit.description || '',
        image: null,
      });

    } else {
      setForm(initialForm);
    }
  }, [carToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('brand', form.brand);
    formData.append('model', form.model);
    formData.append('year', form.year);
    formData.append('price', form.price);
    formData.append('fuel', form.fuel);
    formData.append('mileage', form.mileage);
    formData.append('description', form.description);
    if (form.image) {
      formData.append('image', form.image);
    }

    try {
      if (form.id) {
        await updateCar(form.id, formData);
      } else {
        await createCar(formData);
      }

      setForm(initialForm);
      if (onSuccess) onSuccess();
    } catch (err) {
      alert('Failed to save car: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold">{form.id ? 'Edit' : 'Add'} Car</h2>

      <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="model" placeholder="Model" value={form.model} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="year" placeholder="Year" value={form.year} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="fuel" placeholder="Fuel Type" value={form.fuel} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="mileage" placeholder="Mileage (km)" type="number" value={form.mileage} onChange={handleChange} required className="w-full border p-2 rounded" />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" />
      <input type="file" name="image" accept="image/*" onChange={handleFileChange} className="w-full border p-2 rounded" />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {form.id ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default CarForm;
