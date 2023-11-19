import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { City } from '../interfaces/interfaces';

const BASE_URL = 'http://localhost:8000';
const CitiesContext = createContext({});
function reducer(state, action) {
  switch (action.type) {
    case 'loading': {
      return { ...state, loading: true };
    }
    case 'cities/loaded': {
      return { ...state, loading: false, cities: action.payload };
    }
    case 'city/loaded': {
      return { ...state, loading: false, currentCity: action.payload };
    }
    case 'cities/created': {
      return {
        ...state,
        loading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    }
    case 'cities/deleted': {
      return {
        ...state,
        loading: false,
        cities: state.cities.filter((city: City) => city.id !== action.payload),
        currentCity: {},
      };
    }
    case 'rejected': {
      return { ...state, loading: false, error: action.payload };
    }
    default:
      return new Error('Invalid action type');
  }
}
const initialState = {
  cities: [],
  loading: false,
  currentCity: {},
  error: '',
};
function CitiesProvider({ children }) {
  const [{ cities, loading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState<City[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    dispatch({ type: 'loading' });

    async function fetchData() {
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const json = await response.json();
        dispatch({ type: 'cities/loaded', payload: json });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'An error fetching cities occurred. Awkward...',
        });
      }
    }
    fetchData();
  }, []);

  const fetchCity = useCallback(
    async function fetchCity(id: number) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: 'loading' });
      try {
        const response = await fetch(`${BASE_URL}/cities/${id}`);
        const json = await response.json();
        dispatch({ type: 'city/loaded', payload: json });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'An fetch city error occurred. Awkward...',
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity: City) {
    dispatch({ type: 'loading' });
    try {
      const response = await fetch(`${BASE_URL}/cities/`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      dispatch({ type: 'cities/created', payload: json });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'A create city error occurred. Awkward...',
      });
    }
  }

  async function deleteCity(id: number) {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'cities/deleted', payload: id });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'A delete city error occurred. Awkward...',
      });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        currentCity,
        fetchCity,
        createCity,
        deleteCity,
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
