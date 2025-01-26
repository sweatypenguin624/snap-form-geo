export interface FormData {
  photo: File | null;
  description: string;
  category: string;
  coordinates: {
    latitude: number | null;
    longitude: number | null;
  };
  address: string;
}

export interface LocationData {
  coordinates: {
    latitude: number | null;
    longitude: number | null;
  };
  address: string;
}