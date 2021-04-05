import User from "./user"

interface Location {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface City {
  name: string;
  location: Location;
}

export default interface Hotel {
  city: City;
  preview_image: string;
  images: string[];
  title: string;
  is_favorite: boolean;
  is_premium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  max_adults: number;
  price: number;
  goods: string[];
  host: User;
  description: string;
  location: Location;
  id: number;
}
