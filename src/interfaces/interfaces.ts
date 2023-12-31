export interface City {
  cityName: string;
  country: string;
  emoji: string;
  id?: number;
  date: Date | string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
}

export interface Country {
  country: string;
  emoji: string;
  id: number;
}
