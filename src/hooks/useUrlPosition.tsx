import { useSearchParams } from 'react-router-dom';

function UseUrlPosition() {
  const [searchParams] = useSearchParams();
  const lat = Number(searchParams.get('lat'));
  const lng = Number(searchParams.get('lng'));
  return [lat, lng];
}

export default UseUrlPosition;
