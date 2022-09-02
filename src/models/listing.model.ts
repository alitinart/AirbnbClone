export default interface Listing {
  id?: string;
  image: string;
  name: string;
  location: string;
  availableDates: string;
  description: string;
  price: number;
  ratings: number[];
  author: string;
  rooms: {
    bedrooms: number;
    kitchen: number;
    bathrooms: number;
    livingRooms: number;
    balconies: number;
  };
}
