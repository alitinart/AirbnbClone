import axios from "axios";
import Listing from "../models/listing.model";
import User from "../models/user.model";

const API_URL = "https://airbnb-clone-api-b7mq.onrender.com/api/v1";

export const requests = {
  userRequests: {
    registerUser: async (user: User) => {
      const { data } = await axios.post(`${API_URL}/users/register`, user);
      return data;
    },
    loginUser: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data } = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });
      return data;
    },
    updateUser: async (newUser: User, token: string) => {
      const { data } = await axios.patch(`${API_URL}/users/update`, newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    refreshData: async (token: string) => {
      const { data } = await axios.get(`${API_URL}/users/refresh`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
  },
  listingRequests: {
    getAllListings: async () => {
      const { data } = await axios.get(`${API_URL}/listings`);
      return data;
    },
    addListing: async (listing: Listing, token: string) => {
      const { data } = await axios.post(`${API_URL}/listings`, listing, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    },
  },
};
