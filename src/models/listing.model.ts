export default interface Listing {
  id?: string;
  image: string;
  locationName: string;
  location?: string;
  availableDates: string;
  description: string;
  price: number;
  ratings?: number[];
  author?: string;
  rooms: {
    bedrooms: number;
    kitchens: number;
    bathrooms: number;
    livingRooms: number;
    balconies: number;
  };
}
