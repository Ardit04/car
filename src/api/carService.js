const BASE_URL = 'http://localhost/car/backend/api/cars';

export const getCars = async () => {
  const data = await fetch(`${BASE_URL}/index.php`);
  const res = await data.json();
  return res;
};

export const createCar = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/create.php`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Failed to create car:", result);
      throw new Error(result?.error || "Unknown error");
    }

    return result;
  } catch (err) {
    console.error("createCar() error:", err);
    throw err;
  }
};


export const updateCar = async (id, car) => {
  const res = await fetch(`${BASE_URL}/update.php?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  return res.json();
};

export const deleteCar = async (id) => {
  const res = await fetch(`${BASE_URL}/delete.php?id=${id}`, {
    method: 'DELETE',
  });
  return res.json();
};
