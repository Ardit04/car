const BASE_URL = 'http://localhost/car/backend/api/cars';

export const getCars = async () => {
  const response = await fetch(`${BASE_URL}/index.php`);
  return await response.json();
};

export const createCar = async (formData) => {
  const response = await fetch(`${BASE_URL}/create.php`, {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error || 'Failed to create car');
  }

  return result;
};

export const updateCar = async (id, formData) => {
  const response = await fetch(`${BASE_URL}/update.php?id=${id}`, {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error || 'Failed to update car');
  }

  return result;
};

export const deleteCar = async (id) => {
  const response = await fetch(`${BASE_URL}/delete.php?id=${id}`, {
    method: 'DELETE',
  });

  return await response.json();
};
