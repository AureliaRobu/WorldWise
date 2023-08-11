export interface City {
  cityName: string;
  country: string;
  emoji: string;
  id: number;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
}
