import styles from './CountriesList.module.css';
import { Country, City } from '../interfaces/interfaces';
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';
import { useCities } from '../contexts/CitiesContext';

function CountriesList() {
  const { cities, loading } = useCities();
  if (loading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  const countries: Country[] = cities.reduce((arr: Country[], city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [
        ...arr,
        { country: city.country, emoji: city.emoji, id: city.id },
      ];
    }
    return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountriesList;
