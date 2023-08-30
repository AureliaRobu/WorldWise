import { createContext, useContext, useEffect, useState } from 'react';
import { City } from '../interfaces/interfaces';

const BASE_URL = 'http://localhost:8000';
const CitiesContext = createContext({});
function CitiesProvider({ children }) {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const json = await response.json();
        setCities(json);
      } catch {
        alert('An error occurred. Awkward...');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function fetchCity(id) {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const json = await response.json();
      setCurrentCity(json);
    } catch {
      alert('An error occurred. Awkward...');
    } finally {
      setLoading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        currentCity,
        fetchCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error('useCities must be used within a CitiesProvider');
  }
  return context;
}

export { useCities, CitiesProvider };
